const db = require("../models");
var bcrypt = require("bcryptjs");
const uploadFile = require("../middlewares/upload");
const fs = require("fs");
const User = db.user;
const DemandeJs = db.DemaneJ;
const DemandeRn = db.Demande;
const DemandeP = db.DemandeP;
exports.getList = (req, res) => {
  User.find({}).then((result) => {
    res.status(200).send(result);
  });
};
exports.getListPret = (req, res) => {
  DemandeP.find({}).then((result) => {
    res.status(200).send(result);
  });
};

exports.upload = async (req, res) => {
  try {
    await uploadFile(req, res);
    if (req.file == undefined) {
      return res.status(400).send({ message: "Please upload a file!" });
    }

    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Move jpg file/rename

    newPath = Date.now();
    fs.rename(
      __basedir + "/uploads/" + req.file.originalname,
      __basedir +
        "/uploads/" +
        newPath +
        "." +
        req.file.originalname.split(".")[1],
      function (err) {
        if (err) throw err;
        console.log(newPath);
      }
    );

    res.status(200).send({
      message: "Uploaded the file successfully: " + newPath,
      path: newPath + "." + req.file.originalname.split(".")[1],
    });
  } catch (err) {
    if (err.code == "LIMIT_FILE_SIZE") {
      return res.status(500).send({
        message: "File size cannot be larger than 2MB!",
      });
    }
    res.status(500).send({
      message: `${err}`,
    });
  }
};
exports.AddDemandeJs = (req, res) => {
  const DemandeJ = new DemandeJs({
    cin: req.body.cin,
    username: req.body.username,
    id: req.body.id,
    demande: req.body.demande,
    children: req.body.children,
    resultatFile: req.body.resultatFile,
  });

  const dem = DemandeJs.findOne({ id: { $in: req.body.id } }, (err, dema) => {
    if (dema) {
      res.status(404).send({ message: "vous avez déposer une demande" });
      return;
    } else {
      console.log(req.body.resultatFile);
      DemandeJ.resultatFile = req.body.resultatFile.join(",");

      DemandeJ.save((err, Demande) => {
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
};
exports.AddDemandeRn = (req, res) => {
  const DemandeR = new DemandeRn({
    cin: req.body.cin,
    username: req.body.username,
    id: req.body.id,
    demande: req.body.demande,
    children: req.body.children,
    resultatFile: req.body.resultatFile,
  });

  const dem = DemandeRn.findOne({ id: { $in: req.body.id } }, (err, dema) => {
    if (dema) {
      res.status(404).send({ message: "vous avez déposer une demande" });
      return;
    } else {
      DemandeR.resultatFile = req.body.resultatFile.join(",");

      DemandeR.save((err, Demande) => {
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
};
exports.findDemandeRn = (req, res) => {
  const dem = DemandeRn.findOne({ id: { $in: req.body.id } }, (err, dema) => {
    if (dema) {
      res.send(false);
      return;
    } else {
      res.send(true);
      return;
    }
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
exports.getListeDemandePret = (req, res) => {
  DemandeP.find({}).then((result) => {
    res.status(200).send(result);
  });
};

exports.getListDemandeRn = (req, res) => {
  DemandeRn.find({}).then((result) => {
    res.status(200).send(result);
  });
};

exports.AjouterDemandeP = (req, res) => {
  const DemandePr = new DemandeP({
    cin: req.body.cin,
    username: req.body.username,
    id: req.body.id,
    demande: req.body.demande,
    sommeD: req.body.sommeD,
    PartitionP: req.body.PartitionP,
  });
  const dem = DemandeP.findOne({ id: { $in: req.body.id } }, (err, dema) => {
    if (dema) {
      res.status(404).send({ message: "vous avez déposer une demande" });
      return;
    } else {
      DemandePr.save((err, Demande) => {
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
};
exports.getListDemandeJs = (req, res) => {
  DemandeJs.find({}).then((result) => {
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
    if (!result) res.status(404).send("Utilisatrur non trouvé");
    else res.status(200).send(result);
  });
};
exports.getUserByCin = (req, res) => {
  const findUSer = User.findOne({ cin: req.body.cin }).exec();
  return findUSer;
};
exports.getDemandePret = (req, res) => {
  DemandeP.findById(req.body.id, function (err, result) {
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
