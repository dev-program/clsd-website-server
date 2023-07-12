const { authJwt } = require("../middleware");
const controller = require("../controllers/user_role.controller");

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
    "/api/user_role",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin ,  ],
    controller.findAll
  );

    // Retrieve a single Tutorial with id
    app.get(
      "/api/user_role/:id",
     [authJwt.verifyToken, authJwt.isModeratorOrAdmin ],
      controller.findOne
    );
  // Update a Tutorial with id
  app.put(
    "/api/user_role/:id",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin ],
    controller.update
  );

  
/*
    // Retrieve all published Tutorials
  app.get(
    "/api/user_role/published",
    [authJwt.verifyToken, authJwt.isAdmin ],
    controller.findAllPublished
  );


  // Delete a Tutorial with id
  app.delete(
    "/api/user_role/:id",
    [authJwt.verifyToken, authJwt.isAdmin ],
    controller.delete
  );
*/
 

};

