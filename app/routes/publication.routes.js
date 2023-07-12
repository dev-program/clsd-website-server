const { authJwt } = require("../middleware");
const controller = require("../controllers/publication.controller");

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
    "/api/publication",
    [authJwt.verifyToken, authJwt.isModeratorOrAdminorUser ],
    controller.create
  );

// Retrieve all Tutorials
  app.get(
    "/api/publication",
    [authJwt.verifyToken, authJwt.isModeratorOrAdminorUser ,  ],
    controller.findAll
  );

  // Retrieve a single Tutorial with id
  app.get(
    "/api/publication/:id",
    [authJwt.verifyToken, authJwt.isModeratorOrAdminorUser ],
    controller.findOne
  );

  // Update a Tutorial with id
  app.put(
    "/api/publication/:id",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin ],
    controller.update
  );

  // Delete a Tutorial with id
  app.delete(
    "/api/publication/:id",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin ],
    controller.delete
  );
/*
     // Retrieve all published Tutorials
     app.get(
      "/api/publication/published",
      [authJwt.verifyToken, authJwt.isAdmin ],
      controller.findAllPublished
    );
  */



 // Retrieve all Tutorials
 app.get(
  "/api/public_publication",
  controller.findAllPublic
);
  // Retrieve a single Tutorial with id
  app.get(
    "/api/public_publication/:id",
    controller.findOnePublic
  );


};

