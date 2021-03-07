var express = require("express");
var router = express.Router();
var db = require("../database");

router.get("/all", function (req, res) {
  db.Person.findAll()
    .then((persons) => {
      res.status(200).send(JSON.stringify(persons));
      // res.status(200).send("TEST OK 1");
    })
    .catch((err) => {
      res.status(500).send(JSON.stringify(err));
    });
});

router.get("/:id", function (req, res) {
  db.Person.findByPk(req.params.id)
    .then((person) => {
      res.status(200).send(JSON.stringify(person));
    })
    .catch((err) => {
      res.status(500).send(JSON.stringify(err));
    });
});

router.post("/", function async(req, res) {
  const { userName, password } = req.body;
  db.Person.findOne({ where: { userName, password } })
    .then((person) => {
      res.status(200).send(JSON.stringify(person));
    })
    .catch((err) => {
      res.status(500).send(JSON.stringify(err));
    });
});

router.put("/", function (req, res) {
  const { name, userName, password, id } = req.body;

  db.Person.create({
    name,
    userName,
    password,
    id,
  })
    .then((person) => {
      res.status(200).send(JSON.stringify(person));
    })
    .catch((err) => {
      res.status(500).send(JSON.stringify(err));
    });
});

router.put("/update", function (req, res) {
  console.log("req==>", req);
  db.Person.update({ name: req.body.name }, { where: { id: req.body.id } })
    .then(function (rowsUpdated) {
      res.json(rowsUpdated);
    })
    .catch((err) => {
      res.status(500).send(JSON.stringify(req.body));
    });
});

router.delete("/:id", function (req, res) {
  db.Person.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() => {
      res.status(200).send();
    })
    .catch((err) => {
      res.status(500).send(JSON.stringify(err));
    });
});

module.exports = router;
