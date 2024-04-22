import express from "express";
import { compareSync, genSaltSync, hashSync } from "bcrypt-ts";
import mongoose from "mongoose";
import { PrismaClient } from "@prisma/client/extension";
import cookieParser from "cookie-parser";
import * as jwt from "jsonwebtoken";
import bodyParser from "body-parser";

const app = express();
const prisma = new PrismaClient();
const port = 8080;

mongoose.connect("mongodb://127.0.0.1:27017/propertyverse")
  .then(() => console.log("Connected to db!"))
  .catch(e => console.log(e));

app.use(cookieParser());

const user = {
  "user1": "pass",
}

app.get("/", (req, res) => {
  res.send("Hello World!");
});



app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
