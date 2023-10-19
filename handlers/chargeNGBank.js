const { flw } = require("../utils/flw");

exports.chargeNGBankAcc = (req, res) => {
  const details = {
    tx_ref: "MC-1585230ew9v5050e8",
    phone_number: "0902620185",
    fullname: "Yolande Aglaé Colbert",
    account_bank: "044",
    account_number: "0690000037",
    amount: 7500,
    currency: "NGN",
    email: "twista@rove.press",
  };
  flw.Charge.ng(details)
    .then((response) => {
      res.json(response);
      console.log(response.data);
    })
    .catch((err) => console.log(err));
};

exports.chargeBank = (req, res) => {
  const details = {
    tx_ref: "MC-1585230950507",
    amount: "1500",
    email: "johnmadakin@gmail.com",
    currency: "NGN",
  };
  flw.Charge.bank_transfer(details)

    .then((response) => {
      res.json(response);
      console.log(response.data);
    })
    .catch((err) => console.log(err));
};
