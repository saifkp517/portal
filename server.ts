import express from "express";
import path from "path";
import type { Request, Response, NextFunction } from "express";
import { compareSync, genSaltSync, hashSync } from "bcrypt-ts";
import mongoose from "mongoose";
import { PrismaClient } from "@prisma/client";
import cookieParser from "cookie-parser";
import * as jwt from "jsonwebtoken";
import bodyParser from "body-parser";
import multer from "multer";
import nodemailer from 'nodemailer';

const cors = require('cors')

const app = express();
const prisma = new PrismaClient();
const port = 8080;

interface CustomRequest extends Request {
  user?: any; // Define the user property with any type, you can replace 'any' with the actual type of your user object
}

var corsOptions = {
  origin: /^http:\/\/localhost:300\d$/,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cookieParser());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors(corsOptions))

const user = {
  "user1": "pass",
}

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))


//////////////////////////////////Authentication handlers below//////////////////////////////////////////////

//signup for channel partners
app.post('/signup/partner', async (req, res) => {

  const { name, phone, password, email } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email: email } })

    if (!user) {
      const hash = hashSync(password, genSaltSync(10));

      const newUser = await prisma.user.create({
        data: {
          name: name,
          password: hash,
          email: email,
          role: "PARTNER"
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
app.post('/signin/partner', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email: email } })

    if (!user) {
      return res.status(404).json({
        message: "Account with this Phone Number does not exist!",
        success: false
      })
    }

    let passwordMatch = compareSync(password, user.password);

    if (passwordMatch) {
      let token = jwt.sign(
        {
          name: user.name,
          email: user.email
        },
        'Secret',
        { expiresIn: "3 days" }
      )

      let result = {
        name: user.name,
        email: user.email,
        token: `Bearer ${token}`
      }

      return res.status(200).json({
        ...result,
        message: "Successfully Logged In!"
      })
    }
    else {
      return res.status(401).json({
        message: "Invalid Credentials!",
        success: false
      })
    }


  }
  catch (e) { console.log(e) }
})


//signup for administrators
app.post('/signup/admin', async (req, res) => {

  const { name, phone, password, email } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email: email } })

    if (!user) {
      const hash = hashSync(password, genSaltSync(10));

      const newUser = await prisma.user.create({
        data: {
          name: name,
          password: hash,
          email: email,
          role: "ADMIN"
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
app.post('/signin/admin', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email: email } })

    if (!user) {
      return res.status(404).json({
        message: "Account with this Phone Number does not exist!",
        success: false
      })
    }

    let passwordMatch = compareSync(password, user.password);

    if (passwordMatch) {
      let token = jwt.sign(
        {
          name: user.name,
          email: user.email
        },
        'Secret',
        { expiresIn: "3 days" }
      )

      let result = {
        name: user.name,
        email: user.email,
        token: `Bearer ${token}`
      }

      return res.status(200).json({
        ...result,
        message: "Successfully Logged In!"
      })
    }
    else {
      return res.status(401).json({
        message: "Invalid Credentials!",
        success: false
      })
    }


  }
  catch (e) { console.log(e) }
})

//middleware to authorize users by role
const userAuth = (req: CustomRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.sendStatus(403);
  const token = authHeader.split(" ")[1];
  jwt.verify(token, 'Secret', (err, decoded) => {
    console.log("verifying");
    if (err) return res.sendStatus(403); //invalid token

    console.log(decoded); //for correct token
    req.user = decoded;
    next();
  });
}

//////////////////////////////////Authentication handlers above//////////////////////////////////////////////

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('_');
    cb(null, fileName);
  }
})

const isImage = (file: Express.Multer.File): boolean => {
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
  return allowedMimeTypes.includes(file.mimetype);
};

const fileFilter = (req: Request, file: Express.Multer.File, cb: any): void => {
  if (isImage(file)) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error('Only image files are allowed!')); // Reject the file
  }
}

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
})

app.post('/photos/upload', upload.any(), async (req, res, next) => {

  const files = (req as any).files;

  return res.status(200).json({ message: 'Files uploaded successfully', files: files });
})

/////////////////////////////////////////////property CRUD//////////////////////////////////////////

app.post('/createproperty', async (req, res) => {
  try {
    const {
      building_name,
      asset_type,
      investment_size,
      lockin,
      entry_yeild,
      irr,
      multiplier,
      minimum_investment,
      location,
      tenant,
      overview,
      floorplan,
      tenant_details,
      images,
      additional,
      userId
    } = req.body;

    console.log(req.files);
    const property = await prisma.property.create({
      data: {
        building_name,
        asset_type,
        investment_size,
        lockin,
        entry_yeild,
        irr,
        multiplier,
        minimum_investment,
        location,
        tenant,
        overview,
        floorplan: floorplan ? JSON.parse(floorplan) : null,
        tenant_details: tenant_details ? JSON.parse(tenant_details) : null,
        images: images.length > 0 ? images : [],
        additional: additional ? additional : null,
        userId
      }
    })

    if (property) {
      return res.status(200).json({
        message: "Property successfully uploaded",
        success: true
      })
    }
  }
  catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Internal server error",
      success: false
    });
  }
})

app.post('/update-property', async (req, res) => {

  const { propertyid, building_name, asset_type, investment_size, lockin, entry_yeild, irr, multiplier, minimum_investment, location, tenant, overview, floorplan, tenant_details, images, additional, userId } = req.body;

  const updatedData = {
    building_name,
    asset_type,
    investment_size,
    lockin,
    entry_yeild,
    irr,
    multiplier,
    minimum_investment,
    location,
    tenant,
    overview,
    floorplan: floorplan ? JSON.parse(floorplan) : null,
    tenant_details: tenant_details ? JSON.parse(tenant_details) : null,
    images: Array.isArray(images) && images.length > 0 ? images : [],
    additional,
    userId
  }

  try {
    const updateProperty = await prisma.property.update({
      where: {
        id: propertyid
      },
      data: updatedData
    })
    if (updateProperty) {
      return res.status(200).json({
        updatedData: updateProperty,
        success: true
      })
    }
  }
  catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Internal server error",
      success: false
    });
  }
})

app.get('/properties', async (req, res) => {
  try {
    const properties = await prisma.property.findMany();
    if (properties) {
      return res.status(200).json({
        properties: properties,
        success: true
      })
    }
  }
  catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Internal server error",
      success: false
    });
  }
})

app.get('/property/:propertyid', async (req, res) => {
  try {

    const { propertyid } = req.params;

    const property = await prisma.property.findUnique({
      where: {
        id: propertyid
      }
    })
    if(property) {
      return res.status(200).json({
        property,
        success: true
      })
    }
  }
  catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Internal server error",
      success: false
    });
  }
})

app.post('/delete/:propertyid', async (req, res) => {

  const { propertyid } = req.params;

  try {

    const property = await prisma.property.findUnique({
      where: { id: propertyid }
    })

    if (property) {
      const deleteProperty = await prisma.property.delete({
        where: {
          id: propertyid
        }
      })
      if (deleteProperty) {
        return res.status(200).json({
          message: "Property Successfully Deleted",
          success: true
        })
      }
    }
    else {
      res.status(400).send("Property Does not exist")
    }

  }
  catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Internal server error",
      success: false
    });
  }
})

/////////////////////////////////////////////property CRUD//////////////////////////////////////////


////////////////////////////////////////////email middleware////////////////////////////////////////

const transporter = nodemailer.createTransport({
  host: "smtpout.secureserver.net",
  secure: true,
  tls: {
    ciphers: 'SSLv3'
  },
  requireTLS: true,
  port: 465,
  debug: true,
  auth: {
    user: "support@propertyverse.co.in",
    pass: "PropertyVerse",
  }
})

app.post('/notify-mail', async (req, res) => {

  const { emaillist } = req.body;

  console.log('clicked')
  try {
    const info = await transporter.sendMail({
      from: "Support <support@propertyverse.co.in>",
      to: "saifkp517@gmail.com",
      subject: "Notification: New Property Added",
      text: "Hello,\n\nA new property has been added to PropertyVerse. Please login to view the latest listings.\n\nThank you,\nThe PropertyVerse Team",
      html: `
      <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Property Notification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            margin-bottom: 20px;
        }
        .logo {
            width: 150px;
            height: auto;
        }
        .content {
            padding: 20px;
            background-color: #f9f9f9;
            border-radius: 8px;
        }
        .button {
            display: inline-block;
            background-color: #007bff;
            color: #ffffff;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="https://yourdomain.com/assets/logo.png" alt="PropertyVerse Logo" class="logo">
        </div>
        <div class="content">
            <h2>New Property Notification</h2>
            <p>Hello,</p>
            <p>A new property has been added to PropertyVerse. Please click the button below to view the latest listings:</p>
            <a href="https://propertyverse.co.in/login" class="button">View Properties</a>
            <p>Thank you,<br>The PropertyVerse Team</p>
        </div>
    </div>
</body>
</html>

      `
    });


    if (info) {
      console.log("sent successfully" + info.response)
    }

  }
  catch (err) {
    console.log(err)
  }
})

////////////////////////////////////////////email middleware////////////////////////////////////////

app.get('/authorize', userAuth, async (req: CustomRequest, res) => {
  try {
    const userEmail = req.user.email;
    const user = await prisma.user.findUnique({
      where: {
        email: userEmail
      }
    })
    if (user) {
      return res.status(200).json({
        user: user,
        success: true
      })
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Internal server error",
      success: false
    });
  }
})

//////////////////////////////////investor interface///////////////////////////////////////

app.post('/signin/investor', async (req, res) => {
  const { email, password, provider } = req.body;

  try {
    // Find the user by email
    let user = await prisma.investor.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(400).json({
        message: "No account found with this email. Please sign up first.",
        success: false
      });
    }

    if (provider === 'google') {
      // For Google OAuth, just check if the provider matches
      if (user.provider !== 'google') {
        return res.status(400).json({
          message: "Please sign in using your Google account.",
          success: false
        });
      }
      // Generate JWT or any session management token
      const token = jwt.sign({ userId: user.id }, 'Secret', { expiresIn: '1h' });

      return res.status(200).json({
        message: "Logged in successfully",
        success: true,
        token
      });
    } else {
      // For traditional login, validate the password
      if (user.provider !== 'propertyverse') {
        return res.status(400).json({
          message: "Please sign in using your correct method.",
          success: false
        });
      }

      const isPasswordValid = compareSync(password, user.password!);

      if (!isPasswordValid) {
        return res.status(400).json({
          message: "Invalid email or password",
          success: false
        });
      }

      // Generate JWT or any session management token
      const token = jwt.sign({ userId: user.id }, 'Secret', { expiresIn: '1h' });

      return res.status(200).json({
        message: "Logged in successfully",
        success: true,
        token
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false
    });
  }
});


app.post('/signup/investor', async (req, res) => {
  const { name, email, provider, password } = req.body;

  try {
    // Check if the user already exists
    let investor = await prisma.investor.findUnique({
      where: { email }
    });

    if (investor) {
      return res.status(400).send("An account with this email already exists. Please log in.");
    }

    // If provider is Google, do not require password
    let hash = null;
    if (provider !== "google") {
      if (!password) {
        return res.status(400).send("Password is required for non-Google signups.");
      }
      // Hash the password for traditional signup
      hash = hashSync(password, genSaltSync(10));
    }

    // Create the user
    investor = await prisma.investor.create({
      data: {
        name,
        email,
        password: hash,
        provider: provider === "google" ? provider : 'propertyverse'
      }
    });

    return res.status(201).json({
      message: "User created successfully",
      success: true,
      user: {
        id: investor.id,
        name: investor.name,
        email: investor.email,
        provider: investor.provider
      }
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false
    });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});


