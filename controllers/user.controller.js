const db = require("../models");
var bcrypt = require("bcryptjs");
const User = db.user;
const DemandeRn = db.Demande;
exports.getList = (req, res) => {
  User.find({}).then((result) => {
    res.status(200).send(result);
  });
};

exports.getRapport = (req, res) => {
  User.find({}).then((result) => {
    let maxChilds = [];
    result.forEach((user) => {
      if (user.children.length > maxChilds.length) {
        maxChilds = user.children;
      }
    });

    res.status(200).send({ maxChilds: maxChilds, users: result });
  });
};

exports.getListDemandeRn = (req, res) => {
  DemandeRn.find({}).then((result) => {
    res.status(200).send(result);
  });
};

exports.countRows = (req, res) => {
  User.count(function (err, count) {
    if (err) console.log(err);
    else {
      res.status(200).send(count);
    }
  });
};
exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};
exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};
exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};

exports.deleteUser = (req, res) => {
  User.findByIdAndDelete(req.body.userId).then((err, val) => {
    if (err) {
      res.send(err);
    } else {
      res.status(200).send({ message: "User Deleted" });
    }
  });
};

exports.updateUser = (req, res) => {
  User.findById(req.body.updatedUser, req.body.cin, function (err, result) {
    if (!result) res.status(404).send("User is not found");
    else {
      result.cin = req.body.cin;
      result.password = bcrypt.hashSync(req.body.password.toString(), 8);
      result
        .save()
        .then((result) => {
          res.json("User Updated!");
        })
        .catch((err) => {
          res.status(400).send("Update not possible");
        });
    }
  });
};

exports.getUser = (req, res) => {
  User.findById(req.body.userId, function (err, result) {
    if (!result) res.status(404).send("Enternal error");
    else res.status(200).send(result);
  });
};
exports.Test = (req, res) => {
  res.status(200).send("Works");
};
exports.deleteChild = (req, res) => {
  User.findOneAndDelete(req.body.childId, function (err, result) {
    if (!result) res.status(404).send(console.err);
    else res.status(200).send("Child deleted");
  });
};
