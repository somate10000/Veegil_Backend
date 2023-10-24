const { flw } = require("../utils/flw");

exports.getAllBanks = (req, res) => {
  const payload = {
    country: "NG", //Pass either NG, GH, KE, UG, ZA or TZ to get list of banks in Nigeria, Ghana, Kenya, Uganda, South Africa or Tanzania respectively
  };

  flw.Bank.country(payload)
    .then((response) => {
      res.json(response);

      console.log(response.data);
    })
    .catch((err) => console.log(err.message));
};
