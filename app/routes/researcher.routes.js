const { authJwt } = require("../middleware");
const controller = require("../controllers/researcher.controller");

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
    "/api/researcher",
    [authJwt.verifyToken, authJwt.isModeratorOrAdminorUser ],
    controller.create
  );

// Retrieve all Tutorials
  app.get(
    "/api/researcher",
    [authJwt.verifyToken, authJwt.isModeratorOrAdminorUser ,  ],
    controller.findAll
  );

  // Retrieve a single Tutorial with id
  app.get(
    "/api/researcher/:id",
    [authJwt.verifyToken, authJwt.isModeratorOrAdminorUser ],
    controller.findOne
  );

  // Update a Tutorial with id
  app.put(
    "/api/researcher/:id",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin ],
    controller.update
  );

  // Delete a Tutorial with id
  app.delete(
    "/api/researcher/:id",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin ],
    controller.delete
  );

  /*
     // Retrieve all published Tutorials
     app.get(
      "/api/researcher/published",
      [authJwt.verifyToken, authJwt.isAdmin ],
      controller.findAllPublished
    );
      */

// Retrieve all Tutorials
app.get(
  "/api/public_researcher",
  controller.findAllPublic
);

  // Retrieve a single Tutorial with id
  app.get(
    "/api/public_researcher/:id",
    controller.findOnePublic
  );



  // Retrieve all Tutorials
app.get(
  "/api/public_research_assistant",
  controller.findResearchAssistant
);

app.get(
  "/api/public_research_faculty",
  controller.findResearchFaculty
);

app.get(
  "/api/public_research_head",
  controller.findResearchHead
);


};

