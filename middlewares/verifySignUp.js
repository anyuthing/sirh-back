const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;
checkDuplicateCin = (req, res, next) => {
  // cin
  User.findOne({
    cin: req.body.cin,
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (user) {
      res.status(400).send({ message: "Erreur! cin est déjà utilisé !" });
      return;
    }
    next();
  });
};
checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: `Errer! Role ${req.body.roles[i]} n'existe pas!`,
        });
        return;
      }
    }
  }
  next();
};
const verifySignUp = {
  checkDuplicateCin,
  checkRolesExisted,
};
module.exports = verifySignUp;
