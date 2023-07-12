const { authJwt } = require("../middleware");
const controller = require("../controllers/userinfo.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });





 
// Retrieve all Tutorials
app.get(
  "/api/userinfo",
  controller.findAll
);

 // Retrieve a single Tutorial with id
 app.get(
  "/api/tutorial/:id",
  controller.findOne
);

};

