const { flw } = require("../utils/flw");

exports.getUser = (req, res) => {
  const payload = {
    order_ref: req.body.order_ref, //URF_1677353506207_1440235 // This is the order reference returned in the virtual account number creation
  };
  flw.VirtualAcct.fetch(payload)
    .then((response) => {
      res.json(response);
      console.log(response.data);
    })
    .catch((err) => console.log(err));
};

exports.getBankDetailsFromAccount = (req, res) => {
  const payload = {
    account_number: "0690000032",
    account_bank: "044",
  };
  flw.Misc.verify_Account(payload)
    .then((response) => {
      res.json(response);
      console.log(response.data);
    })
    .catch((err) => console.log(err));
};
