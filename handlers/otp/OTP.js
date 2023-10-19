const { flw } = require("../../utils/flw");

exports.sendOTP = (req, res) => {
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

  const response = flw.Otp.create(payload)
    .then((response) => {
      res.json(response);
      console.log(response.data);
    })
    .catch((err) => console.log(err));
  console.log(response);
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
