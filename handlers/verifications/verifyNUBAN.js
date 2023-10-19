const { flw } = require("../../utils/flw");

exports.verifyNUBAN = (req, res) => {
  const payload = {
    account_number: "0690000032", //req.params.acc_nos
    account_bank: "044", //req.params.acc_nos
  };
  flw.Misc.verify_Account(payload)

    .then((response) => {
      res.json(response);
      console.log(response.data);
    })
    .catch((err) => console.log(err));
};
