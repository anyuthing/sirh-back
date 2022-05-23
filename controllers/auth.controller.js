const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;
const DemandeRn = db.Demande;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
exports.AddDemande = (req, res) => {
  const Demande = new DemandeRn({
    cin: req.body.cin,
    username: req.body.username,
    id: req.body.id,
    demande: req.body.demande,
    inscription: req.body.inscription,
  });

  const dem = DemandeRn.findOne({ id: { $in: req.body.id } }, (err, dema) => {
    if (dema) {
      res.status(404).send({ message: "vous avez déja fait une demande" });
      return;
    } else {
      if (req.files) {
        let path = "";
        req.files.forEach(function (files, index, arr) {
          path = path + files.path + ",";
        });
        path = path.substring(0, path.lastIndexOf(","));
        Demande.inscription = path;
      }

      Demande.save((err, Demande) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        } else {
          res.status(200).send({ message: "Application faite avec succées" });
          return;
        }
      });
    }
  });

  /*  if (dem) {
   
    res.status(404).send({ message: "vous avez déja fait une demande" });
    return;
  } else {
    Demande.save((err, Demande) => {
      res.status(200).send({ message: "Application faite avec succées" });
      return;
    });
  } */
};
exports.signup = (req, res) => {
  const user = new User({
    cin: req.body.cin,
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password.toString(), 8),
    roles: [req.body.role],
    grade: req.body.grade,
    children: req.body.children,
  });
  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles },
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          user.roles = roles.map((role) => role._id);
          user.save((err) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
            res.send({ message: "User was registered successfully!" });
          });
        }
      );
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        user.roles = [role._id];
        user.save((err) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          res.send({ message: "User was registered successfully!" });
        });
      });
    }
  });
};

exports.verify_token = (req, res) => {
  res.status(200).send({ api_token: req.body.api_token });
};

exports.signin = (req, res) => {
  User.findOne({
    cin: req.body.cin,
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (!user) {
        return res.status(404).send({ message: "Utilisateur non trouvé" });
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Mot de pass invalide. ",
        });
      }
      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });
      var authorities = [];
      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }
      res.status(200).send({
        id: user._id,
        username: user.username,
        cin: user.cin,
        roles: authorities,
        api_token: token,
      });
    });
};
