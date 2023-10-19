const { flw } = require("../utils/flw");

exports.createBill = (req, res) => {
  const payload = {
    country: "NG",
    customer: "+23490803840303",
    amount: 100,
    recurrence: "ONCE",
    type: "AIRTIME",
    reference: "930rwrwr0049404444",
  };

  flw.Bills.create_bill(payload)
    .then((response) => {
      res.json(response);
      console.log(response.data);
    })
    .catch((err) => console.log(err));
};
