var express = require("express");
var moment = require("moment");
var admin = require("../config/firebase.config");
var router = express.Router();

const firestore = admin.firestore();

/* GET data. */
router.get("/", async (req, res, next) => {
  const expenseRef = firestore.collection("expense");
  const doc = await expenseRef.get();
  const data = [];
  doc.forEach((docs) => {
    data.push({ id: docs.id, data: docs.data() });
  });

  res.json({ msg: "Get Data", data });
});

/* POST create data. */
router.post("/create", async (req, res, next) => {
  const { account, date, dollar, title, type } = req.body;
  const id = `${moment.now()}-${Math.floor(Math.random() * 100000)}`;
  await firestore.collection("expense").doc(id).set({
    account,
    date,
    dollar,
    title,
    type,
  });

  res.json({ msg: `Create Successful id: ${id}` });
});

/* PUT update data. */
router.put("/update", async (req, res, next) => {
  const { id, account, date, dollar, title, type } = req.body;
  await firestore
    .collection("expense")
    .doc(id)
    .update({ account, date, dollar, title, type });

  res.json({ msg: "Update Successful" });
});

/* DELETE remove data. */
router.delete("/delete", async (req, res, next) => {
  const { id } = req.body;
  await firestore.collection("expense").doc(id).delete();

  res.json({ msg: "Remove Successful" });
});

module.exports = router;
