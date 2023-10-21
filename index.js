console.log("FlutteWave");

require("dotenv").config();
const express = require("express");

const app = express();
const cors = require("cors");
const PORT = process.env.PORT;

const { getAllBanks } = require("./handlers/banks/getAllBanks");
const { verifyNUBAN } = require("./handlers/verifications/verifyNUBAN");
const { verifyBVN } = require("./handlers/verifications/verifyBVN");
const {
  signup,
  login,
  checkForUser,
  getUserDetails,
  getUserIn,
  updateUserDetails,
} = require("./handlers/NewUser");
const { sendOTP, validateOTP } = require("./handlers/otp/OTP");
const { chargeCard, fundCard } = require("./handlers/card/chargeCard");
const { transfer, merchantTransfer } = require("./handlers/transfer/transfer");
const { chargeNGBankAcc, chargeBank } = require("./handlers/chargeNGBank");
const { getUser, getBankDetailsFromAccount } = require("./handlers/getUser");
const { bankverti } = require("./handlers/paystack/verti");
const { Subaccount } = require("./handlers/#[main]/user_acc");
const {
  createVirtualAccount,
  fetchVirtualAccount,
  subVirtualAccount,
} = require("./handlers/virtual_account/account");
const {
  getATransfer,
  getTransferFee,
  getTransferStatus,
} = require("./handlers/transfer/maintenance");
const {
  getAllSettlements,
  getASettlements,
} = require("./handlers/settlements/settlements");
const {
  billAgencies,
  billCategories,
  createBill,
  billStatus,
} = require("./handlers/bills");
const {
  createBeneficiary,
  fetchABeneficiary,
  listAllBeneficiary,
  deleteABeneficiary,
} = require("./handlers/beneficiary/beneficiaries");
const {
  createVirtualCard,
  fundVirtualCard,
  getAVirtualCard,
  withdrawFromVirtualCard,
} = require("./handlers/virtual_card_&_maintenance/cards");

const {
  blockVirtualCard,
  unblockVirtualCard,
  terminateVirtualCard,
  transactionsThroughVirtualCard,
} = require("./handlers/virtual_card_&_maintenance/maintenance");

app.use(express.json());

app.use(cors());

app.get("/bank", bankverti);
app.get("/acc", Subaccount);
app.get("/api/getUserIn", getUserIn);
app.post("/api/getUserDetails", getUserDetails);

// Get Virtual Account
app.get("/getUser", getUser);

// Check for User
app.post("/api/checkuser", checkForUser);

// Create new user && Virtual Account
app.post("/api/signup", signup);

// Login to User
app.post("/api/login", login);

// Login to User
app.post("/api/update", updateUserDetails);

// Get All local Banks
app.get("/api/getallBanks", getAllBanks);

// Get Bank Details From Account Number
app.get("/getUserFromAccNumber", getBankDetailsFromAccount);

// Verify BVN
app.post("/api/verifyBVN", verifyBVN);

// Charge NGN Bank Account
app.get("/chargeNGBankAcc", chargeNGBankAcc);

// Charge Bank generates Account for funds to be transfered to you
app.get("/chargeBank", chargeBank);

// Charge Bank generates Account for funds to be transfered to you
app.get("/chargeCard", chargeCard);

// Fund Card
//app.get("/fundCard", fundCard); **********************************

// Send OTP
app.post("/sendOTP", sendOTP);

// validate sent OTP
app.post("/validateOTP", validateOTP);

// Bill Agencies
app.get("/billAgencies", billAgencies);

// Bill Categories e.g Airtime, Data, Pay for Dstv
app.get("/api/billCategories", billCategories);

// Create Bill e.g Buy Airtime, Sub Data, Pay for Dstv
app.post("/api/createBill", createBill);

// Get BillStatus e.g
app.get("/billStatus", billStatus);

// Verify NGN Accounts
app.get("/api/verifyNUBAN", verifyNUBAN);

//// VIRTUAL ACCOUNT ////

// Create a Virtual Account
app.post("/api/createVirtualAccount", createVirtualAccount);

// Fetch a Virtual Account
app.post("/api/fetchVirtualAccount", fetchVirtualAccount);

// Create a SUB - Virtual Account
app.post("/api/subVirtualAccount", subVirtualAccount);

//// TRANSFER ////

// Transfer to NGN Accounts
app.post("/api/transfer", transfer);

// Transfer to Merchant Wallet
app.post("/api/merchantransfer", merchantTransfer);

// Get a Transfer
app.get("/api/getATransfer", getATransfer);

// Get Transfer fee
app.get("/api/getTransferFee", getTransferFee);

// Get Transfer status
app.get("/api/getTransferStatus", getTransferStatus);

//// BENEFICAIRIES ////

// Create Beneficiary
app.get("/api/createBeneficiary", createBeneficiary);

// List all Beneficiaries
app.get("/api/listAllBeneficiary", listAllBeneficiary);

// Fetch a Beneficiary
app.get("/api/fetchABeneficiary", fetchABeneficiary);

// Delete a Beneficiary
app.get("/api/deleteABeneficiary", deleteABeneficiary);

//// VIRTUAL CARDS ////

// Create Virtual Card
app.post("/api/createVirtualCard", createVirtualCard);

//  Fund Virtual Card
app.post("/api/fundVirtualCard", fundVirtualCard);

// Get a Virtual Card,
app.post("/api/getAVirtualCard", getAVirtualCard);

// Withdraw from Virtual Card
app.post("/api/withdrawFromVirtualCard", withdrawFromVirtualCard);

//Block Virtual Card
app.post("/api/blockVirtualCard", blockVirtualCard);

//Unblock Virtual Card
app.post("/api/unblockVirtualCard", unblockVirtualCard);

//Terminate Virtual Card
app.post("/api/terminateVirtualCard", terminateVirtualCard);

//Transactions through Virtual Card
app.post("/api/transactionThoughVirtualCard", transactionsThroughVirtualCard);

//// SETTLEMENT ////

//Get all Settlements
app.post("/api/getAllSettlements", getAllSettlements);

//  Get a Settlement
app.post("/api/getASettlements", getASettlements);

app.listen(PORT, () => {
  console.log("Server Running on", PORT);
});
