const { db } = require("../utils/Admin");

exports.getUserDetails = (req, res) => {
  console.log(req.body.email);
  const users = db
    .collection("users")
    .doc(req.body.email.trim())
    .get()
    .then((data) => {
      return res.status(202).json(data.data()), console.log("ddd", data.data());
    })
    .catch((e) => console.log(e));
};
