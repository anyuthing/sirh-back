const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

// User = Personnel
// Modertator = RH
// Admin = DRH

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Origin: *");
    next();
  });
  app.get("/api/user/countRows", controller.countRows);
  app.get("/api/user/all", controller.allAccess);
  app.post("/api/user/deleteUser", controller.deleteUser);
  app.post("/api/user/getUser", controller.getUser);
  app.get(
    "/api/user/getList",

    controller.getList
  );
  app.get("/api/user/getRapport", controller.getRapport);
  app.get(
    "/api/user/ListeDemandeRn",

    controller.getListDemandeRn
  );
  app.post("/api/user/deleteChild", controller.deleteChild);
  app.get(
    "/api/user/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

  app.get(
    "/api/user/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
  app.post(
    "/api/user/updateUser",

    controller.updateUser
  );
  app.get("/api/user/test", controller.Test);
};
