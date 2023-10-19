const { flw } = require("../utils/flw");

exports.billCategories = (req, res) => {
  flw.Bills.fetch_bills_Cat()
    .then((response) => {
      res.json(response);
      console.log(response.data);
    })
    .catch((err) => console.log(err));
};

exports.billAgencies = (req, res) => {
  flw.Bills.fetch_bills_agencies()
    .then((response) => {
      res.json(response);
      console.log(response.data);
    })
    .catch((err) => console.log(err));
};

exports.createBill = (req, res) => {
  // const payload = {
  //   country: "NG",
  //   customer: "+23490803840303",
  //   amount: 100,
  //   recurrence: "ONCE",
  //   type: "MTN 5 GB data bundle",
  //   // name: "BIL111",
  //   reference: "930rwrwr00494044442j",
  // };
  /// BUY DATA  ////
  // const payload = {
  //    country: "NG",
  // customer: "08030000000",
  // amount: 100,
  // type: "MTN 50 MB",
  // recurrence: "ONCE",
  // reference:"UIWEGIUWEDUIWE"
  // };
  console.log(req.body);

  const payload = {
    country: "NG",
    customer: req.body.customer,
    amount: req.body.amount,
    recurrence: "ONCE",
    type: req.body.type,
    reference: Math.random() * (40000000 - 300) - 1,
  };

  console.log(payload.reference);

  flw.Bills.create_bill(payload)
    .then((response) => {
      res.json(response);
      console.log(response);
    })
    .catch((err) => console.log(err));
};

exports.billStatus = (req, res) => {
  const payload = {
    reference: "9300049404444",
  };

  flw.Bills.fetch_status(payload)
    .then((response) => {
      res.json(response);
      console.log(response.data);
    })
    .catch((err) => console.log(err));
};
