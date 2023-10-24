const { flw } = require("../utils/flw");

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
