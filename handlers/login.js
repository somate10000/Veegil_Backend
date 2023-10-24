const firebase = require("firebase/app");
const Auth = require("firebase/auth");
const config = require("../utils/config");
const auth = Auth.getAuth(firebase.initializeApp(config));

const { validateLoginData } = require("../utils/validators");

exports.login = (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
  };
  console.log("USER: ", user);

  const { valid, errors } = validateLoginData(user);
  if (!valid) return res.status(400).json(errors);

  console.log("STAGE 1");

  Auth.signInWithEmailAndPassword(auth, user.email.trim(), user.password.trim())
    .then((data) => {
      return res.end(JSON.stringify(data.user));
    })
    .catch((error) => {
      console.error(error);
      if (
        error.code === "auth/wrong-password" ||
        error.code === "auth/user-not-found"
      ) {
        return res
          .status(403)
          .json({ general: "Wrong credentials, check emaill and password" });
      }
      if (error.code === "auth/network-request-failed") {
        return res.status(404).json({ general: "Network Error, Try Again!!" });
      }
      return res.status(500).json({ error: error.code });
    });
};
