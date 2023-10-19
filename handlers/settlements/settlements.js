const { flw } = require("../../utils/flw");

exports.getAllSettlements = async (req, res) => {
  const response = await flw.Settlement.fetch_all()
    .then((response) => {
      res.json(response);
      console.log(response.data);
    })
    .catch((err) => console.log(err));
  console.log(response);
};

exports.getASettlements = async (req, res) => {
  const payload = {
    id: "2911", //This is a unique identifier for the particular settlement you want to fetch.
    from: "2019-01-01",
    to: "2020-05-22",
  };
  const response = await flw.Settlement.fetch(payload)

    .then((response) => {
      res.json(response);
      console.log(response.data);
    })
    .catch((err) => console.log(err));
  console.log(response);
};
