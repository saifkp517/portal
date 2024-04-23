import express from "express";
import { compareSync, genSaltSync, hashSync } from "bcrypt-ts";
import mongoose from "mongoose";
import { PrismaClient } from "@prisma/client";
import cookieParser from "cookie-parser";
import * as jwt from "jsonwebtoken";
import bodyParser from "body-parser";
import { data } from "./client/app/components/Chart";

const app = express();
const prisma = new PrismaClient();
const port = 8080;

app.use(cookieParser());

const user = {
  "user1": "pass",
}

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post('/signup', async (req, res) => {

  const { name, phone, password } = req.body;

  try {
    const user = await prisma.user.findUnique({where: {phone: phone}})

    if (!user) {
      const hash = hashSync(password, genSaltSync(10));

      const newUser = await prisma.user.create({
        data: {
          name: name,
          phone: phone,
          password: hash
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

app.post('/signin', async (req, res) => {
  const { phone, password } = req.body;

  try {
    const user = await prisma.user.findUnique({where: {phone: phone}})

    if (!user) {
      return res.json({
        message: "Account with this Phone Number does not exist!",
        success: false
      })
    }

    if(compareSync(password, user.password))
    {

    }
    else
    {
      return res.json({
        message: "Invalid Credentials!",
        success: false
      })
    }


  }
  catch (e) { console.log(e) }
})

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
