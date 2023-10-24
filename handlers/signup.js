const { db, admin } = require("../utils/Admin");
const { validateSignupData } = require("../utils/validators");

const User = admin.auth();

exports.signup = (req, res) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    handle: req.body.email,
    phoneNumber: req.body.phoneNumber,
  };

  const payload = {
    acc_email: req.body.email,
    acc_nuban: req.body.phoneNumber,
    handle: req.body.email,
    acc_phonenumber: "+234" + req.body.phoneNumber,
    account_name: req.body.account_name,
    country: "NG",
    account_refrence: req.body.account_reference,
    is_permanent: true,
    bvn: req.body.bvn,
    date_of_birth: req.body.date_of_birth,
    title: req.body.title,
    gender: req.body.gender,
    amount: 0,
    bank_code: req.body.bank_code,
    created_on: req.body.created_on,
    imageUrl: req.body.imageUrl,
  };

  const { valid, errors } = validateSignupData(newUser);
  if (!valid) return res.status(400).json(errors);
  console.log("errors:", errors);

  if (valid) {
    console.log("Valid");

    User.createUser({
      email: req.body.email,
      emailVerified: false,
      phoneNumber: "+234" + req.body.phoneNumber,
      password: req.body.password,
      displayName: req.body.account_name,
      photoURL: "http://www.example.com/12345678/photo.png",
      disabled: false,
    })

      .then(async (userRecord) => {
        // See the UserRecord reference doc for the contents of userRecord.
        console.log("Successfully created new user:", userRecord);
        await User.createCustomToken(userRecord.uid).then((token) => {
          db.doc(`/users/${newUser.handle}`).set(payload);
          return res.json(token);
        });
      })
      .catch((error) => {
        console.log(error);
        if (error.code === "auth/email-already-in-use") {
          return res.status(403).json({ general: "Email already in use" });
        }
        if (error.code === "auth/network-request-failed") {
          return res
            .status(404)
            .json({ general: "Network Error, Try Again!!" });
        } else {
          return res
            .status(403)
            .json({ general: "something went wrong try again" });
        }
        // return res.status(500).json({ error: error.code });
      });
  } else {
    return res.status(400).json(errors);
  }
};
