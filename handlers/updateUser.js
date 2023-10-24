const { db } = require("../utils/Admin");

exports.updateUserDetails = (req, res) => {
  db.collection("users")
    .doc(req.body.email)
    .update({
      amount: req.body.newAmount,
    })
    .then((data) => {
      console.log(data), res.status(202).json(data);
    })
    .catch((e) => console.log(e));
};
