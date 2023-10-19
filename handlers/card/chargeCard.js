const { flw } = require("../../utils/flw");

exports.chargeCard = (req, res) => {
  const payload = {
    card_number: "4556052704172643",
    cvv: "899",
    expiry_month: "09",
    expiry_year: "23",
    currency: "NGN",
    amount: "7500",
    email: "developers@flutterwavego.com",
    fullname: "Flutterwave Developers",
    tx_ref: "MC-3243e",
    redirect_url: "https://your-awesome.app/payment-redirect",
    enckey: process.env.ENC_KEY,
  };
  flw.Charge.card(payload)
    .then((response) => {
      res.json(response);
      console.log(response.data);
    })
    .catch((err) => console.log(err));
};

// Check for pin and otp
// const response = await flw.Charge.validate({
//     otp: req.body.otp,
//     flw_ref: req.session.flw_ref
// });
