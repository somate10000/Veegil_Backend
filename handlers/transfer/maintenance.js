const { flw } = require("../../utils/flw");

exports.getTransferFee = async (req, res) => {
  const payload = {
    amount: "5000",
    currency: "NGN",
  };

  const response = await flw.Transfer.fee(payload)
    .then((response) => {
      res.json(response);
      console.log(response.data);
    })
    .catch((err) => console.log(err));
  console.log(response);
};

exports.getTransferStatus = async (req, res) => {
  const payload = {
    status: "failed",
  };
  const response = await flw.Transfer.fetch(payload)
    .then((response) => {
      res.json(response);
      console.log(response.data);
    })
    .catch((err) => console.log(err));
  console.log(response);
};

exports.getATransfer = async (req, res) => {
  const payload = {
    id: "1570636", // This is the numeric ID of the transfer you want to fetch. It is returned in the call to create a transfer as data.id
  };

  const response = await flw.Transfer.get_a_transfer(payload)
    .then((response) => {
      res.json(response);
      console.log(response.data);
    })
    .catch((err) => console.log(err));
  console.log(response);
};
