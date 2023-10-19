const { flw } = require("../../utils/flw");

exports.createVirtualCard = async (req, res) => {
  // On  creating Virtual Card store Id with USER's details
  const payload = {
    currency: "NGN",
    amount: 200,
    first_name: "Dwayne",
    last_name: "Johnson",
    date_of_birth: "1972/05/02",
    email: "dwaynejohnson@gmail.com",
    phone: "08082479297",
    title: "Mr",
    gender: "M",
    callback_url: "https://your-callback-url.com/",
  };
  const response = await flw.VirtualCard.create(payload)
    .then((response) => {
      res.json(response);
      console.log(response.data);
    })
    .catch((err) => console.log(err));
  console.log(response);
};

exports.getAVirtualCard = async (req, res) => {
  const payload = {
    id: "c6d7f40b-f772-47b7-8136-81256d2f87a2", //This is the unique id of the particular card you want to fetch its details. You can get this id from the call to create a virtual card or list virtual cards as data.id
  };
  const response = await flw.VirtualCard.fetch(payload)
    .then((response) => {
      res.json(response);
      console.log(response.data);
    })
    .catch((err) => console.log(err));
  console.log(response);
};

exports.fundVirtualCard = async (req, res) => {
  const payload = {
    id: "c6d7f40b-f772-47b7-8136-81256d2f87a2", //This is the unique id of the particular card you want to fund. You can get this id from the call to create a virtual card as data.id
    amount: 500,
    debit_currency: "NGN",
  };
  const response = await flw.VirtualCard.fund(payload)
    .then((response) => {
      res.json(response);
      console.log(response.data);
    })
    .catch((err) => console.log(err));
  console.log(response);
};

exports.withdrawFromVirtualCard = async (req, res) => {
  const payload = {
    id: "92b5d258-e85f-4ca6-835d-e0c6fa20d958",
    amount: 10,
  };
  const response = await flw.VirtualCard.withdraw_funds(payload)
    .then((response) => {
      res.json(response);
      console.log(response.data);
    })
    .catch((err) => console.log(err));
  console.log(response);
};
