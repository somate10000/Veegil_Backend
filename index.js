console.log("FlutteWave");

require("dotenv").config();
const express = require("express");

const app = express();
const cors = require("cors");
const PORT = process.env.PORT;

const { login } = require("./handlers/login");
const { signup } = require("./handlers/signup");
const { transfer } = require("./handlers/transfer");
const { checkForUser } = require("./handlers/checkUser");
const { getAllBanks } = require("./handlers/getAllBanks");
const { updateUserDetails } = require("./handlers/updateUser");
const { getUserDetails } = require("./handlers/getUserDetails");

app.use(express.json());

app.use(cors());

// Create a new User
app.post("/api/signup", signup);

// Login to  a User
app.post("/api/login", login);

// Transfer to NGN Accounts
app.post("/api/transfer", transfer);

// Check for User
app.post("/api/checkuser", checkForUser);

// Get All local Banks
app.get("/api/getallBanks", getAllBanks);

// Update the data of a User
app.post("/api/update", updateUserDetails);

// Get User Details
app.post("/api/getUserDetails", getUserDetails);

app.listen(PORT, () => {
  console.log("Server Running on", PORT);
});
