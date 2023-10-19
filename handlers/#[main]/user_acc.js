const { flw } = require("../../utils/flw");

exports.Subaccount = (req, res) => {
  const payload = {
    account_name: "John Doe",
    email: "developers@flutterwavego.com",
    mobilenumber: "08090605595",
    country: "NG",
  };

  flw.Subaccount.create(payload)
    .then((response) => {
      res.json(response);
      console.log(response.data);
    })
    .catch((err) => console.log(err));
};
