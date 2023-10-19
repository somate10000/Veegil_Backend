const { data } = require("autoprefixer");
const firebase = require("firebase/app");
const Auth = require("firebase/auth");

const { db, admin } = require("../utils/Admin");
const config = require("../utils/config");
const auth = Auth.getAuth(firebase.initializeApp(config));

const {
  validateSignupData,
  validateLoginData,
  reducerUserDetails,
} = require("../utils/validators");

exports.signup = (req, res) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    handle: req.body.handle,
  };

  const { valid, errors } = validateSignupData(newUser);

  if (!valid) return res.status(400).json(errors);

  const noImg = "blank-profile-picture-973460_960_720.webp";

  let token, userId;
  db.doc(`/users/${newUser.handle}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return res.status(400).json({ handle: "this handle is already taken" });
      } else {
        return Auth.createUserWithEmailAndPassword(
          auth,
          newUser.email,
          newUser.password
        );
      }
    })
    .then((data) => {
      userId = data.user.uid;
      return [data, data.user.getIdToken()];
    })
    .then((idToken) => {
      token = idToken;
      const userCredentials = {
        handle: newUser.handle,
        email: newUser.email,
        createdAt: new Date().toISOString(),
        imageUrl: `https://firebasestorage.googleapis.com/v/0/b/${config.storageBucket}/o/${noImg}?alt=media`,
        userId,
      };
      return db.doc(`/users/${newUser.handle}`).set(userCredentials);
    })
    .then(() => {
      return res.status(201).json({ token });
    })
    .catch((err) => {
      console.error(err);
      if (err.code === "auth/email-already-in-use") {
        return res.status(400).json({ email: "Email is already in use" });
      } else {
        return res.status(500).json({ error: err.code });
      }
    });
};

exports.login = (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
  };

  const { valid, errors } = validateLoginData(user);

  if (!valid) return res.status(400).json(errors);

  const expiresIn = 60 * 60 * 24 * 5 * 1000;
  //Auth.setPersistence(firebase.auth.Persistence.NONE);
  let Data, AccessToken, RefreshToken;
  Auth.signInWithEmailAndPassword(auth, user.email, user.password)

    .then((data) => {
      Data = data;
      RefreshToken = Data.user.refreshToken;

      return data.user.getIdToken();
    })
    .then((AccessToken) => {
      return (
        admin
          .auth()
          .createSessionCookie(AccessToken, { expiresIn })
          .then((sessionCookie) => {
            const options = {
              maxAge: expiresIn,
              httpOnly: true,
              secure: true,
              path: "/",
            };
            res.cookie("session", sessionCookie, options);
            res.end(JSON.stringify({ Data, RefreshToken, AccessToken }));
          }),
        (error) => {
          console.error("Error", error);
          res.status(401).json("UNAUTHORIZIED REQUEST");
        }
      );
    })
    .catch((error) => {
      console.error(error);
      if (error.code === "auth/wrong-password") {
        return res
          .status(403)
          .json({ general: "Wrong credentials, check emaill and password" });
      }
      return res.status(500).json({ error: error.code });
    });
};

exports.addUserDetails = (req, res) => {
  let userDetails = reducerUserDetails(req.body);

  db.doc(`/users/${req.user.handle}`)
    .update(userDetails)
    .then(() => {
      return res.json({ message: "Details successfully added" });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ error: err.code });
    });
};

exports.getAuthenticatedUser = (req, res) => {
  let userData = {};

  db.doc(`/users/${req.user.handle}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        console.log(doc);
        userData.credentials = doc.data();
        return db
          .collection("likes")
          .where("userHandle", "==", req.user.handle)
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
        .where("recipient", "==", req.user.handle)
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

exports.uploadImage = (req, res) => {
  const BusBoy = require("busboy");
  const path = require("path");
  const os = require("os");
  const fs = require("fs");

  const busboy = BusBoy({ headers: req.headers });

  let imageFileName;
  let imageToBeUploaded = {};

  busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
    console.log(fieldname);
    console.log(filename);
    console.log(mimetype);
    const imageExtension = filename.split(".")[filename.split(".").length - 1];
    imageFileName = `${Math.random(
      Math.random * 10000000000000
    )}.${imageExtension}`;
    const filepath = path.join(os.tmpdir(), imageFileName);
    imageToBeUploaded = { filepath, mimetype };
    file.pipe(fs.createWriteStream(filepath));
  });
  busboy.on("finish", () => {
    admin
      .storage()
      .bucket.upload(imageToBeUploaded.filepath, {
        resumable: false,
        metadata: {
          metadata: {
            contentType: imageToBeUploaded.mimetype,
          },
        },
      })
      .then(() => {
        const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}?alt=media`;
        return db.doc(`/users/${req.user.handle}`).update({ imageUrl });
      })
      .then(() => {
        return res.json({ message: "Image Uploaded successfully" });
      })
      .catch((err) => console.error(err));
    return res.status(500).json({ error: err });
  });
  busboy.end(req.rawBody);
};
