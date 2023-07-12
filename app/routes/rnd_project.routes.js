const { authJwt } = require("../middleware");
const controller = require("../controllers/rnd_project.controller");

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
    "/api/rnd_project",
    [authJwt.verifyToken, authJwt.isModeratorOrAdminorUser ],
    controller.create
  );

// Retrieve all Tutorials
  app.get(
    "/api/rnd_project",
    [authJwt.verifyToken, authJwt.isModeratorOrAdminorUser ,  ],
    controller.findAll
  );

  // Retrieve a single Tutorial with id
  app.get(
    "/api/rnd_project/:id",
    [authJwt.verifyToken, authJwt.isModeratorOrAdminorUser ],
    controller.findOne
  );

  // Update a Tutorial with id
  app.put(
    "/api/rnd_project/:id",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin ],
    controller.update
  );

  // Delete a Tutorial with id
  app.delete(
    "/api/rnd_project/:id",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin ],
    controller.delete
  );

 /*
     // Retrieve all published Tutorials
  app.get(
    "/api/rnd_project/published",
    [authJwt.verifyToken, authJwt.isAdmin ],
    controller.findAllPublished
  );
*/



// Retrieve all Public event
app.get(
  "/api/public_rnd_project",
  controller.findAllPublic
);

  // Retrieve a single Public event with id
  app.get(
    "/api/public_rnd_project/:id",
    controller.findOnePublic
  );

};

