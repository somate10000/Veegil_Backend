const { flw } = require("../../utils/flw");

exports.transfer = (req, res) => {
  const details = {
    account_bank: "044",
    account_number: "0690000031",
    amount: 200000000,
    narration: "Payment for things",
    currency: "NGN",
    reference: "wallet-transfer" + Date.now(),
    callback_url: "https://webhook.site/b3e505b0-fe02-430e-a538-22bbbce8ce0d",
    debit_currency: "NGN",
  };
  flw.Transfer.initiate(details)
    .then((response) => {
      res.json(response);
      console.log(response.data);
    })
    .catch((err) => console.log(err));
};

exports.merchantTransfer = (req, res) => {
  const details = {
    account_bank: "flutterwave", // This should always be set to flutterwave
    merchant_id: "2360844", //This is the recipient merchant ID
    amount: 5500, //This is the amount to transfer to the recipient
    narration: "payment for x service provided",
    currency: "NGN", //This can be NGN, GHS, KES, UGX, TZS, USD
    reference: "wallet-transfer" + Date.now(), //This is a merchant's unique reference for the transfer, it can be used to query for the status of the transfer
    debit_currency: "NGN", //You can pass this when you want to debit a currency balance and send money in another currency.
  };
  flw.Transfer.initiate(details)
    .then((response) => {
      res.json(response);
      console.log(response.data);
    })
    .catch((err) => console.log(err));
};

// const payload = {
//     account_bank: "flutterwave", // This should always be set to flutterwave
//     merchant_id: "2360844", //This is the recipient merchant ID
//     amount: 5500, //This is the amount to transfer to the recipient
//     narration: "payment for x service provided",
//     currency: "NGN", //This can be NGN, GHS, KES, UGX, TZS, USD
//     reference: "wallet-transfer" + Date.now(), //This is a merchant's unique reference for the transfer, it can be used to query for the status of the transfer
//     debit_currency: "NGN", //You can pass this when you want to debit a currency balance and send money in another currency.
//   };
