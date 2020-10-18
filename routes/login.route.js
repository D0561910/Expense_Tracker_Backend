var express = require("express");
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var admin = require("../config/firebase.config");
var router = express.Router();

const firestore = admin.firestore();

const findUser = async (email, password) => {
  var data = {};
  const snapshot = await firestore
    .collection("users")
    .where("email", "==", email)
    .get();

  if (snapshot.empty) {
    console.log("No matching documents.");
    return false;
  }

  snapshot.forEach((element) => {
    const userObj = element.data();
    data = userObj;
  });

  const match = await bcrypt.compare(password, data.password);
  return match;
};

/* POST user login verfication. */
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  const user = await findUser(email, password);
  if (user) {
    jwt.sign(
      { user, email },
      "AccountTracker",
      { expiresIn: "60m" },
      (err, token) => {
        res.status(200).json({
          msg: "Login Successfully",
          token: `Bearer ${token}`,
        });
      }
    );
  } else {
    res.status(403).json({ error: "Forbidden" });
  }
});

module.exports = router;
