const { authJwt } = require("../middleware");
const controller = require("../controllers/avp.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Create a new Tutorial
  app.post(
    "/api/avp",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin ],
    controller.create
  );

// Retrieve all Tutorials
  app.get(
    "/api/avp",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin ,  ],
    controller.findAll
  );

  // Retrieve a single Tutorial with id
  app.get(
    "/api/avp/:id",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin ],
    controller.findOne
  );

  // Update a Tutorial with id
  app.put(
    "/api/avp/:id",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin ],
    controller.update
  );

  // Delete a Tutorial with id
  app.delete(
    "/api/avp/:id",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin ],
    controller.delete
  );

  /*
  // Retrieve all published Tutorials
  app.get(
    "/api/avp/published",
    [authJwt.verifyToken, authJwt.isAdmin ],
    controller.findAllPublished
  );
  */
 

};

