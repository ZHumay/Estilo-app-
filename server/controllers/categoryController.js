const { v4: uuidv4 } = require("uuid");
// const fs = require("fs");
// const path = require("path");
const { Category } = require("../models/category");

const categoryController = {
  getAll: (req, res) => {
    Category.find()
    .populate([
      { path: "woman" },
      { path: "man" }
    ])

      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  getById: (req, res) => {
    let id = req.params.id;

    Category.findById(id)
    .populate([
      { path: "woman" },
      { path: "man" }
    ])
      .then((data) => {
        if (data) res.json(data);
        else res.status(404).json({ msg: "Not found!" });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  add: (req, res) => {
    let category = new Category({
      type: req.body.type,
      filter: req.body.filter
    });

    category.save();

    res.json(category);
  },
  deleteById: (req, res) => {
    let id = req.params.id;

    Category.findByIdAndDelete(id)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  update: (req, res) => {
    let id = req.params.id;

    Category.findById(id)
      .then((data) => {
        data.category = req.body.category;

        data.save();

        res.json(data);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
};

module.exports = {
  categoryController,
};