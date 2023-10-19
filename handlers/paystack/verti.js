const { default: axios } = require("axios");
const { request } = require("express");

exports.bankverti = (req, res) => {
  const payload = {
    length: 7,
    customer: {
      name: "Kazan",
      email: "somate10000@gmail.com",
      phone: "2348168171276",
    },
    sender: "Flutterwave",
    send: true,
    medium: ["email", "whatsapp"],
    expiry: 5,
  };

  const token = "sk_test_629a0accda2d66d205ce033f885e277e3fb22c6b";

  const data = axios(
    "https://api.paystack.co:443/bank/resolve?account_number=0000210624&bank_code=044",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
    .then((response) => {
      res.json(response);
      console.log(response.data);
    })
    .catch((err) => console.log(err));
  console.log(data);
};

exports.validateOTP = (req, res) => {
  const payload = {
    reference: "CF-BARTER-20230226103659739817",
    otp: "8433751",
  };

  const response = flw.Otp.validate(payload)
    .then((response) => {
      res.json(response);
      console.log(response.data);
    })
    .catch((err) => console.log(err));
  console.log(response);
};
