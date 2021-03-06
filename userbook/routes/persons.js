var express = require("express");
var router = express.Router();
var db = require("../database");

router.get("/all", function (req, res) {
  db.Person.findAll()
    .then((persons) => {
      res.status(200).send(JSON.stringify(persons));
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

router.put("/", function (req, res) {
  db.Person.create({
    name: req.body.name,
    userName: req.body.userName,
    password: req.body.password,
    id: req.body.id,
  })
    .then((person) => {
      res.status(200).send(JSON.stringify(person));
    })
    .catch((err) => {
      res.status(500).send(JSON.stringify(err));
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
