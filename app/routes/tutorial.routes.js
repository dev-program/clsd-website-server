const { authJwt } = require("../middleware");
const controller = require("../controllers/tutorial.controller");

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
    "/api/tutorial",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin ],
    controller.create
  );

// Retrieve all Tutorials
  app.get(
    "/api/tutorial",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin ,  ],
 
    controller.findAll
  );

    // Retrieve all published Tutorials
  app.get(
    "/api/tutorial/published",
    [authJwt.verifyToken, authJwt.isAdmin ],
    controller.findAllPublished
  );

  // Retrieve a single Tutorial with id
  app.get(
    "/api/tutorial/:id",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin ],
    controller.findOne
  );

  // Update a Tutorial with id
  app.put(
    "/api/tutorial/:id",
    [authJwt.verifyToken, authJwt.isAdmin ],
    controller.update
  );

  // Delete a Tutorial with id
  app.delete(
    "/api/tutorial/:id",
    [authJwt.verifyToken, authJwt.isAdmin ],
    controller.delete
  );

 

};

