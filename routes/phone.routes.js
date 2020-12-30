const express = require("express");
var multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage }).single("avatar");
const router = express.Router();
const phone = require("../models/phone.model");
const m = require("../helpers/middlewares");

/* All phones */
router.get("/", async (req, res) => {
  await phone
    .getPhones()
    .then((phones) => res.json(phones))
    .catch((err) => {
      if (err.status) {
        res.status(err.status).json({ message: err.message });
      } else {
        res.status(500).json({ message: err.message });
      }
    });
});

/* A phone by id */
router.get("/:id", m.mustBeInteger, async (req, res) => {
  const id = req.params.id;

  await phone
    .getPhone(id)
    .then((phone) => res.json(phone))
    .catch((err) => {
      if (err.status) {
        res.status(err.status).json({ message: err.message });
      } else {
        res.status(500).json({ message: err.message });
      }
    });
});

/* Insert a new phone */
router.post("/", m.checkFieldsPhone, async (req, res) => {
  await phone
    .insertPhone(req.body)
    .then((phone) =>
      res.status(201).json({
        message: `The phone #${phone.id} has been created`,
        content: phone,
      })
    )
    .catch((err) => res.status(500).json({ message: err.message }));
});

// /* Update a phone */
router.put("/:id", m.mustBeInteger, upload, async (req, res) => {
  const id = req.params.id;
  await phone
    .updatePhone(id, req.body, req.file)
    .then((phone) =>
      res.json({
        message: `The phone #${id} has been updated`,
        content: phone,
      })
    )
    .catch((err) => {
      if (err.status) {
        res.status(err.status).json({ message: err.message });
      }
      res.status(500).json({ message: err.message });
    });
});

// router.put("/:id", (req, res) => {
//   upload(req, res, (err) => {
//     if (err) {
//       res.sendStatus(500);
//     }
//     res.send(req.file);
//   });
// });

/* Delete a phone */
router.delete("/:id", m.mustBeInteger, async (req, res) => {
  const id = req.params.id;

  await phone
    .deletePhone(id)
    .then((phone) =>
      res.json({
        message: `The phone #${id} has been deleted`,
      })
    )
    .catch((err) => {
      if (err.status) {
        res.status(err.status).json({ message: err.message });
      }
      res.status(500).json({ message: err.message });
    });
});

module.exports = router;
