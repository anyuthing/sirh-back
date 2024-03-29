const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");
const upload = require("../middlewares/upload");
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post(
    "/api/auth/signup",
    [verifySignUp.checkDuplicateCin, verifySignUp.checkRolesExisted],
    controller.signup
  );

  app.post("/api/auth/Demande", controller.AddDemande);
  app.post("/api/auth/signin", controller.signin);
  app.post("/api/auth/verify_token", controller.verify_token);
};
