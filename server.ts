import express from "express";
import type { Request, Response, NextFunction } from "express";
import { compareSync, genSaltSync, hashSync } from "bcrypt-ts";
import mongoose from "mongoose";
import { PrismaClient } from "@prisma/client";
import cookieParser from "cookie-parser";
import * as jwt from "jsonwebtoken";
import bodyParser from "body-parser";
import { data } from "./client/app/components/Chart";

const cors = require('cors')

const app = express();
const prisma = new PrismaClient();
const port = 8080;

var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cookieParser());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors(corsOptions))

const user = {
  "user1": "pass",
}

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post('/createproperty', async (req, res) => {
  try {


    const property = await prisma.property.create({
      data: req.body
    })

    if(property) {
      return res.status(200).json({
        message: "Property successfully uploaded",
        success: true
      })
    }
  }
  catch(e)
  {
    console.log(e)
  }
})

//signup
app.post('/signup', async (req, res) => {

  const { name, phone, password, email } = req.body;

  try {
    const user = await prisma.user.findUnique({where: {phone: phone}})

    if (!user) {
      const hash = hashSync(password, genSaltSync(10));

      const newUser = await prisma.user.create({
        data: {
          name: name,
          phone: phone,
          password: hash,
          email: email
        }
      })

      if (newUser) {
        return res.status(200).json({
          message: "User successfully Signed Up!",
          success: true
        })
      }
    }

    return res.json({
      message: "Account with this Phone Number exists!",
      success: false
    })
  }
  catch (e) {
    console.log(e);
  }
})


//signin
app.post('/signin', async (req, res) => {
  const { phone, password } = req.body;

  try {
    const user = await prisma.user.findUnique({where: {phone: phone}})

    if (!user) {
      return res.status(404).json({
        message: "Account with this Phone Number does not exist!",
        success: false
      })
    }

    let passwordMatch = compareSync(password, user.password);

    if(passwordMatch)
    {
      let token = jwt.sign(
        {
          name: user.name,
          phone: user.phone,
          email: user.email
        },
        'Secret',
        {expiresIn: "3 days"}
      )

      let result = {
        name: user.name,
        phone: user.phone,
        email: user.email,
        token: `Bearer ${token}`
      }

      return res.status(200).json({
        ...result,
        message: "Successfully Logged In!"
      })
    }
    else
    {
      return res.status(401).json({
        message: "Invalid Credentials!",
        success: false
      })
    }


  }
  catch (e) { console.log(e) }
})

//middleware to authorize users by role
const userAuth = (req: Request , res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.sendStatus(403);
  const token = authHeader.split(" ")[1];
  jwt.verify(token, 'Secret', (err, decoded) => {
    console.log("verifying");
    if (err) return res.sendStatus(403); //invalid token

    console.log(decoded); //for correct token
    next();
  });
}

app.post('/test', userAuth ,(req, res) => {
  res.send('test');
})

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
