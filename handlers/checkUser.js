const { db } = require("../utils/Admin");

const { checkForUser } = require("../utils/validators");

exports.checkForUser = (req, res) => {
  const newUser = {
    email: req.body.email,
  };
  console.log("ddd", newUser);
  const { valid, errors } = checkForUser(newUser);

  if (!valid) return res.status(400).json(errors);

  db.doc(`/users/${newUser.email}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return res.status(400).json({ handle: "USER EXISTS" });
      } else return res.json({ message: "NO MATCH" }); //res.status(402).json("NO MATCH"), console.log("NO MATCH");
    })
    .catch((err) => {
      console.log(err);
    });
};
