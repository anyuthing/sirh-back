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
    next();
  });
  app.get("/api/user/all", controller.allAccess);
  app.get(
    "/api/user/getList",
    [authJwt.verifyToken, authJwt.isModerator, authJwt.isAdmin],
    controller.getList
  );
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
};
