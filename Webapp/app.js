const dotenv = require("dotenv");
dotenv.config();

const port = process.env.PORT;

const express = require("express");
const app = express();

app.use(express.json());

console.log("test" + port);