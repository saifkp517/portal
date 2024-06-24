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
import { createClient } from "redis";
import { randomInt } from "crypto";
import dotenv from "dotenv";

const cors = require('cors');
dotenv.config();

const app = express();
const redisClient = createClient();
const prisma = new PrismaClient();
const port = 8080;
const jwtSecret: string = process.env.JWT_SECRET as string;

interface CustomRequest extends Request {
  user?: any; // Define the user property with any type, you can replace 'any' with the actual type of your user object
}

const allowedOrigins = ["https://www.propertyverse.co.in", "https://dashboard.propertyverse.co.in", "http://localhost:3000"]
app.use((req, res, next) => {
  const origin: any = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

var corsOptions = {
  origin: ["https://www.propertyverse.co.in", "https://dashboard.propertyverse.co.in", "http://localhost:3000"],
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(cookieParser());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors(corsOptions))
app.options('*', cors(corsOptions));

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
  catch (error) {
    console.log(error);
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
        jwtSecret,
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
  catch (error) { console.log(error) }
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
  catch (error) {
    console.log(error);
  }
})


//signin
app.post('/signin/admin', async (req, res) => {
  const { email, password, provider } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email: email } })

    if (!user) {
      return res.status(404).json({
        message: "Account with this Email address does not exist!",
        success: false
      })
    }

    let passwordMatch = compareSync(password, user.password);

    if (provider)

      if (passwordMatch) {
        return res.status(200).json({
          message: "Successfully Logged In!",
          user: user
        })
      }
      else {
        return res.status(401).json({
          message: "Invalid Credentials!",
          success: false
        })
      }


  }
  catch (error) { console.log(error) }
})

//middleware to authorize users by role
const userAuth = (req: CustomRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.sendStatus(403);
  const token = authHeader.split(" ")[1];
  jwt.verify(token, jwtSecret, (err, decoded) => {
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
  console.log('trying to upload');

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
  catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error" + error,
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
  catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error" + error,
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
  catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error" + error,
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
    if (property) {
      return res.status(200).json({
        property,
        success: true
      })
    }
  }
  catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error" + error,
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
  catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error" + error,
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
    pass: "Propertyverse",
  }
})

//use for newsletter instead
/**
app.post('/otp-mail', async (req, res) => {

  const { email, OTP } = req.body;

  console.log('clicked')
  try {
    const info = await transporter.sendMail({
      from: "Support <support@propertyverse.co.in>",
      to: email,
      subject: "Notification: New Property Added",

      text: "Hello,\n\nA new property has been added to PropertyVerse. Please login to view the latest listings.\n\nThank you,\nThe PropertyVerse Team",
      html: `
      <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>OTP Verification - PropertyVerse</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                color: #333333;
                margin: 0;
                padding: 0;
            }
            .container {
                width: 100%;
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .header {
                background-color: #2e86de;
                color: #ffffff;
                padding: 20px;
                text-align: center;
            }
            .header h1 {
                margin: 0;
                font-size: 24px;
            }
            .content {
                padding: 20px;
            }
            .content p {
                font-size: 16px;
                line-height: 1.5;
            }
            .otp {
                display: block;
                width: max-content;
                margin: 20px auto;
                padding: 10px 20px;
                font-size: 24px;
                font-weight: bold;
                background-color: #2e86de;
                color: #ffffff;
                border-radius: 4px;
                text-align: center;
            }
            .footer {
                background-color: #f4f4f4;
                padding: 20px;
                text-align: center;
                font-size: 12px;
                color: #777777;
            }
            .footer a {
                color: #2e86de;
                text-decoration: none;
            }
            .footer a:hover {
                text-decoration: underline;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>PropertyVerse</h1>
            </div>
            <div class="content">
                <p>Hello,</p>
                <p>Your One-Time Password (OTP) for verifying your account on PropertyVerse is:</p>
                <div class="otp">${OTP}</div>
                <p>Please enter this code on the verification page to complete the process. The OTP is valid for 10 minutes.</p>
                <p>If you did not request this, please ignore this email or contact our support team.</p>
                <p>Thank you,<br>The PropertyVerse Team</p>
            </div>
            <div class="footer">
                <p>&copy; 2024 PropertyVerse. All rights reserved.</p>
                <p><a href="https://propertyverse.co.in">Visit our website</a> | <a href="mailto:support@propertyverse.co.in">Contact Support</a></p>
            </div>
        </div>
    </body>
    </html>`
    });


    if (info) {
      res.status(200).send("sent successfully" + info.response)
    }

  }
  catch (err) {
    console.log(err)
  }
})
   */

//////////////////////twilio config ///////////////////////////////////////////
import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = twilio(accountSid, authToken);

const rateLimit: { [key: string]: number } = {};

app.post('/otp-sms', async (req, res) => {
  const { phone, OTP } = req.body;
  console.log('Rate Limit Object:', rateLimit);

  if (!phone || !OTP) {
    return res.status(400).json({
      message: "Phone number and OTP are required.",
      success: false,
    });
  }

  if (rateLimit[phone] && (Date.now() - rateLimit[phone]) < 2 * 60 * 1000) {
    console.log("Rate limit hit for phone:", phone);
    return res.status(429).json({
      message: "Too many requests. Please try again later.",
      success: false,
    });
  }
  try {
    client.messages.create({
      body: `Your OTP is ${OTP}. Please do not share your OTP with anyone, employers do not ask for One Time Passwords`,
      from: "+18702769764",
      to: `+91${phone}`,
    })
    .then(message => console.log(message.sid))

  } catch (error) {
    console.error("Twilio Error:", error);
    res.status(500).json({
      message: `Internal error: ${error}`,
      success: false,
    });
  }
});



//////////////////////////////authorization////////////////////////////////////

app.get('/authorize', userAuth, async (req: CustomRequest, res) => {
  try {
    const userEmail = req.user.email;
    if (!userEmail) {
      console.log("no")
    }
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
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error" + error,
      success: false
    });
  }
})

//////////////////////////////////investor interface///////////////////////////////////////

app.post('/signin/investor', async (req, res) => {
  const { email, password, provider } = req.body;

  try {
    // Find the user by email
    let user = await prisma.investor.findFirst({
      where: {
        email,
        provider: "propertyverse"
      }
    });

    if (!user) {
      return res.status(400).json({
        message: "No account found with this email. Please sign up first.",
        success: false
      });
    }
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
    const token = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: '1h' });

    return res.status(200).json({
      message: "Logged in successfully",
      success: true,
      user
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error" + error,
      success: false
    });
  }
});

app.post('/oauth/investor', async (req, res) => {
  const { email } = req.body;

  try {
    let user = await prisma.investor.findFirst({
      where: {
        email,
        provider: "google"
      }
    });

    if (!user) {
      user = await prisma.investor.create({
        data: {
          email,
          provider: "google"
        }
      });
    }

    return res.status(200).json({ success: true, user });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error" + error,
      success: false
    });
  }
});

app.post('/signup/investor', async (req, res) => {
  const { email, password, phone } = req.body;

  const handleExistingInvestor = (investor: any, res: Response) => {
    if (investor.verified) {
      return res.status(400).json({
        userId: investor.id,
        verified: true,
        message: "An account with this email already exists. Please log in."
      });
    } else {
      return res.status(200).json({
        userId: investor.id,
        verified: false,
        message: "User Verification"
      });
    }
  }

  let [oauthInvestor, investor] = await Promise.all([
    prisma.investor.findFirst({
      where: {
        email,
        provider: "google"
      }
    }),
    prisma.investor.findFirst({
      where: {
        email,
        provider: "propertyverse"
      }
    }),
  ])

  if (investor) {
    return handleExistingInvestor(investor, res);
  }

  if (oauthInvestor) {
    return handleExistingInvestor(oauthInvestor, res);
  }

  if (!password) {
    return res.status(400).send("Password is required.");
  }

  // Hash the password for traditional signup
  const hash = hashSync(password, genSaltSync(10));

  // Create the user
  investor = await prisma.investor.create({
    data: {
      email,
      password: hash,
      phoneno: phone,
      provider: "propertyverse"
    }
  });

  return res.status(201).json({
    message: "User created successfully",
    verified: false,
    success: true,
    user: {
      id: investor.id,
      email: investor.email,
      provider: investor.provider
    }
  });

});

app.get('/investor/:investorid', async (req, res) => {

  try {
    const userData = await prisma.investor.findUnique({
      where: {
        id: req.params.investorid
      }
    })

    if (!userData) {
      return res.status(400).send("Invalid user-id")
    }

    return res.status(200).json({
      userData: userData
    })

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error" + error,
      success: false
    });
  }
})

app.post('/investor/update', async (req, res) => {
  try {
    const { name, phoneno, id } = req.body;

    const userUpdate = await prisma.investor.update({
      where: {
        id
      },
      data: {
        name,
        phoneno
      }
    })

    if (!userUpdate) {
      return res.status(400).send("Invalid user-id")
    }

    return res.status(200).json({
      message: "Successfully added details"
    })


  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error" + error,
      success: false
    });
  }
})

////////////////////////////otp generation and retrieval////////////////////////
app.post('/generate-otp', async (req, res) => {

  const generateOtp = () => {
    return randomInt(1000, 9999).toString();
  }

  const { email } = req.body;
  if (!email) {
    return res.status(400).send("User Email is required!")
  }

  const otp = generateOtp();
  try {
    await redisClient.setEx(email, 300, otp)
    res.status(200).send({ otp })
  } catch (err) {
    res.status(500).send('Error generating OTP');
  }
})

app.post('/verify-otp', async (req, res) => {
  const { email, otp, id } = req.body;
  if (!email || !otp) {
    return res.status(400).send("User Email and OTP is required!")
  }

  try {
    //fetch otp from redis
    const storedOtp = await redisClient.get(email)
    console.log(storedOtp, otp, email);

    if (storedOtp === null) {
      res.status(400).send("OTP has expired, click on Resend")
    }

    if (storedOtp === otp) {
      await prisma.investor.updateMany({
        where: { id },
        data: { verified: true }
      })
      res.status(200).send("OTP verified Successfully");
    }
    else {
      res.status(400).send("Invalid OTP");
    }
  }
  catch (err) {
    res.status(500).send('Error verifying OTP');
  }
})

app.listen(port, async () => {
  const connect = await redisClient.connect();
  if (connect)
    console.log("Redis Connected")
  console.log(`Listening on port ${port}...`);
});


