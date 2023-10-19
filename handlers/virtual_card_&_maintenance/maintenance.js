const { flw } = require("../../utils/flw");

exports.terminateVirtualCard = async (req, res) => {
  const payload = {
    id: "c6d7f40b-f772-47b7-8136-81256d2f87a2",
  };
  const response = await flw.VirtualCard.terminate(payload)
    .then((response) => {
      res.json(response);
      console.log(response.data);
    })
    .catch((err) => console.log(err));
  console.log(response);
};

exports.transactionsThroughVirtualCard = async (req, res) => {
  const payload = {
    id: "92b5d258-e85f-4ca6-835d-e0c6fa20d958",
    from: "2019-01-01",
    to: "2020-05-24",
    index: "0", //Pass "0" if you want to start from the beginning
    size: "5", //Specify how many transactions you want to retrieve in a single call
  };
  const response = await flw.VirtualCard.transactions(payload)
    .then((response) => {
      res.json(response);
      console.log(response.data);
    })
    .catch((err) => console.log(err));
  console.log(response);
};

exports.blockVirtualCard = async (req, res) => {
  const payload = {
    id: "92b5d258-e85f-4ca6-835d-e0c6fa20d958",
    status_action: "block",
  };
  const response = await flw.VirtualCard.block(payload)
    .then((response) => {
      res.json(response);
      console.log(response.data);
    })
    .catch((err) => console.log(err));
  console.log(response);
};

exports.unblockVirtualCard = async (req, res) => {
  const payload = {
    id: "92b5d258-e85f-4ca6-835d-e0c6fa20d958",
    status_action: "unblock",
  };
  const response = await flw.VirtualCard.block(payload)
    .then((response) => {
      res.json(response);
      console.log(response.data);
    })
    .catch((err) => console.log(err));
  console.log(response);
};
