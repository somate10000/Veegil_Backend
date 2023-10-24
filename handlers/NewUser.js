const { db, admin } = require("../utils/Admin");

const firebase = require("firebase/app");
const Auth = require("firebase/auth");

const config = require("../utils/config");
const auth = Auth.getAuth(firebase.initializeApp(config));

const {
  validateSignupData,
  validateLoginData,
  reducerUserDetails,
  checkForUser,
} = require("../utils/validators");

const { flw } = require("../utils/flw");

const code = {
  url: "https://www.example.com/?email=user@example.com",
  iOS: {
    bundleId: "com.example.ios",
  },
  android: {
    packageName: "com.example.android",
    installApp: true,
    minimumVersion: "12",
  },
  handleCodeInApp: true,
};

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

exports.signup = (req, res) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    handle: req.body.email,
    phoneNumber: req.body.phoneNumber,
  };
  console.log("ddd", newUser);
  const noImg = "blank-profile-picture-973460_960_720.webp";
  //console.log(req.body);

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

  const data = [payload];

  const { valid, errors } = validateSignupData(newUser);
  if (!valid) return res.status(400).json(errors);
  console.log("err:", errors);

  if (valid) {
    console.log("Valid");

    const User = admin.auth();

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
          // const enc = [payload].push({ jwt_token: jwt }),
          // return res.json(enc), console.log(enc)
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
    // Auth.createUserWithEmailAndPassword(auth, payload.email, payload.password)
    //   .then((data) => {
    //     return db.doc(`/users/${newUser.handle}`).set(payload), res.json(data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     if (error.code === "auth/email-already-in-use") {
    //       return res.status(403).json({ general: "Email already in use" });
    //     } else {
    //       return res
    //         .status(403)
    //         .json({ general: "something went wrong try again" });
    //     }
    //   });
    // console.log("Hama");
  } else {
    return res.status(400).json(errors);
  }
};

exports.login = (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
  };
  console.log("USER: ", user);

  const { valid, errors } = validateLoginData(user);

  if (!valid) return res.status(400).json(errors);

  console.log("Hehe");

  const expiresIn = 1600 * 60 * 24 * 5 * 1000;
  //Auth.setPersistence(firebase.auth.Persistence.NONE);
  let Data, AccessToken, RefreshToken;
  Auth.signInWithEmailAndPassword(auth, user.email.trim(), user.password.trim())

    .then((data) => {
      Data = data;
      RefreshToken = Data.user.refreshToken;

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

exports.updateUserDetails = (req, res) => {
  const acc_name = "Veegil Sunday";
  // console.log(req.body.email);

  db.collection("users")
    .doc(req.body.email)
    .update({
      amount: req.body.newAmount,
    })
    .then((data) => {
      console.log(data), res.status(202).json(data);
      // return res.status(202).json(data.data()), console.log(data.data());
    })
    .catch((e) => console.log(e));
};

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
exports.getUserIn = (req, res) => {
  const users = db
    .collection("users")
    .doc("Flashkid21@flash.com")
    .get()
    .then((data) => console.log(data.data()))
    .catch((e) => console.log(e));

  // const usersDb = db.collection("users");
  // const liam = usersDb.doc("lragozzine");
  // const struct = liam
  //   .set({
  //     first: "Liam",
  //     last: "Ragozzine",
  //     address: "133 5th St., San Francisco, CA",
  //     birthday: "05/13/1990",
  //     age: "30",
  //   })
  //   .then((data) => console.log("LOG", data));
  // console.log("STRUCT", struct);

  // const user = Auth.getAuth().onAuthStateChanged((user) => {
  //   if (user) {
  //     // User Signed In
  //     console.log("User Signed In");
  //     console.log("USER", user);
  //     // ...
  //   } else {
  //     // No user is signed in.
  //     console.log("User Signed Out");
  //   }
  // });
};

exports.getUserIns = (req, res) => {
  let userData = {};

  db.doc(`/users/Flashkid21@flash.com `)
    .get()
    .then((doc) => {
      if (doc.exists) {
        console.log(doc);
        userData.credentials = doc.data();
        return db
          .collection("likes")
          .where("userHandle", "==", "Flashkid21@flash.com")
          .get();
      }
    })
    .then((data) => {
      userData.likes = [];
      data.forEach((doc) => {
        userData.likes.push(doc.data());
      });
      return db
        .collection("notifications")
        .where("recipient", "==", "req.user.handle")
        .orderBy("createdAt", "desc")
        .limit(10)
        .get();
    })
    .then((data) => {
      userData.notifications = [];
      data.forEach((doc) => {
        userData.notifications.push({
          recipient: doc.data().recipient,
          sender: doc.data().sender,
          createdAt: doc.data().createdAt,
          screamId: doc.data().screamId,
          type: doc.data().type,
          notifications: doc.id,
        });
      });
      return res.json(userData);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};
