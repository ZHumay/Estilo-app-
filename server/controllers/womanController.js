const { v4: uuidv4 } = require("uuid");
const { Woman } = require("../models/woman");
// const fs = require("fs");
// const path = require("path");

const womanController = {
  getAll: (req, res) => {
    Woman.find()
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  getById: (req, res) => {
    let id = req.params.id;

    Woman.findById(id)
      .then((data) => {
        if (data) res.json(data);
        else res.status(404).json({ msg: "Not found!" });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  add: (req, res) => {
    let woman  = new Woman({
      type: req.body.type,
    });

    woman .save();

    res.json(woman );
  },
  deleteById: (req, res) => {
    let id = req.params.id;

    Woman.findByIdAndDelete(id)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  update: (req, res) => {
    let id = req.params.id;

    Woman.findById(id)
      .then((data) => {
        data.woman = req.body.woman;

        data.save();

        res.json(data);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
};

module.exports = {
  womanController,
};