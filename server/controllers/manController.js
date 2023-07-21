const { v4: uuidv4 } = require("uuid");
const { Man } = require("../models/man");
// const fs = require("fs");
// const path = require("path");

const manController = {
  getAll: (req, res) => {
    Man.find()
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  getById: (req, res) => {
    let id = req.params.id;

    Man.findById(id)
      .then((data) => {
        if (data) res.json(data);
        else res.status(404).json({ msg: "Not found!" });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  add: (req, res) => {
    let man  = new Man({
      type: req.body.type,
    });

    man.save();

    res.json(man );
  },
  deleteById: (req, res) => {
    let id = req.params.id;

    Man.findByIdAndDelete(id)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  update: (req, res) => {
    let id = req.params.id;

    Man.findById(id)
      .then((data) => {
        data.man = req.body.man;

        data.save();

        res.json(data);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
};

module.exports = {
  manController,
};