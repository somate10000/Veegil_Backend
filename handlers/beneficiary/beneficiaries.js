const { flw } = require("../../utils/flw");

exports.createBeneficiary = async (req, res) => {
  const payload = {
    account_number: "0690000034",
    account_bank: "044", // This is the beneficiary’s bank code, you can use the List of Banks to retrieve a bank code.
  };
  const response = await flw.Beneficiary.create(payload)
    .then((response) => {
      res.json(response);
      console.log(response.data);
    })
    .catch((err) => console.log(err));
  console.log(response);
};

exports.listAllBeneficiary = async (req, res) => {
  const response = await flw.Beneficiary.fetch_all()
    .then((response) => {
      res.json(response);
      console.log(response.data);
    })
    .catch((err) => console.log(err));
  console.log(response);
};

exports.fetchABeneficiary = async (req, res) => {
  const payload = {
    id: "4150", //This is the unique identifier for the beneficiary you intend to fetch. It is returned in the call to create a beneficiary as data.id
  };
  const response = await flw.Beneficiary.fetch(payload)
    .then((response) => {
      res.json(response);
      console.log(response.data);
    })
    .catch((err) => console.log(err));
  console.log(response);
};

exports.deleteABeneficiary = async (req, res) => {
  const payload = {
    id: "4150", //This is the unique identifier for the beneficiary you intend to fetch. It is returned in the call to create a beneficiary as data.id
  };
  const response = await flw.Beneficiary.delete(payload)
    .then((response) => {
      res.json(response);
      console.log(response.data);
    })
    .catch((err) => console.log(err));
  console.log(response);
};
