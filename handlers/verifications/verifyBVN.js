const { flw } = require("../../utils/flw");

exports.verifyBVN = (req, res) => {
  //const payload = {bvn:req.body.bvn}
  const payload = { bvn: "123478322" };
  flw.Misc.bvn(payload)
    .then((response) => {
      res.json(response);
      console.log(response.data);
    })
    .catch((err) => console.log(err));
};
