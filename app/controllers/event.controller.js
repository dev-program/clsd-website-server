const db = require("../models");
const Tutorial = db.events;
const Op = db.Sequelize.Op;



const fileUpload = require("express-fileupload");

const { google } = require("googleapis");
const fs = require("fs");

const CLIENT_ID = "535909455773-d8nh7t58bboje9obe50cigpg0b908bke.apps.googleusercontent.com";
const CLIENT_SECRET = "535909455773-d8nh7t58bboje9obe50cigpg0b908bke.apps.googleusercontent.com";
const REDIRECT_URI = "http://localhost:5001/oauth2callback";
const REFRESH_TOKEN = "your_refresh_token";

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });


exports.create = (req, res) => {
  // Check if a file was uploaded
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  // Get the uploaded file
  const file = req.files.file;
  const fileName = file.name;

  // Move the file to the server
  file.mv(`./public/event/${fileName}`, (err) => {
    if (err) {
      return res.status(500).send(err);
    }

    // Create a Tutorial
    const tutorial = {
      title: req.body.title,
      description: req.body.description,
      published: req.body.published ? req.body.published : false,
      fileName: fileName,
      tags: req.body.tags,
      archived: req.body.archived ? req.body.archived : false,
    };

    // Save Tutorial in the database
    Tutorial.create(tutorial)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message ||
            "Some error occurred while creating the Tutorial.",
        });
      });
  });
};





// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Tutorial.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Tutorial.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Tutorial with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id
      });
    });
};

{/*}
// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Tutorial.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Tutorial was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id
      });
    });
};
*/}


// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Tutorial.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Tutorial was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Tutorial.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Tutorials were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    });
};



// find all published Tutorial
exports.findAllPublished = (req, res) => {
  Tutorial.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};







exports.findAllPublic = (req, res) => {
  const title = req.query.title;
  const id = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Tutorial.findAll({ where: { ...id, published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};






exports.findOnePublic = (req, res) => {
  const id = req.params.id;

  Tutorial.findOne({ where: { id, published: true } })
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Tutorial with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id
      });
    });
};




exports.update = (req, res) => {
  const id = req.params.id;

  Tutorial.findByPk(id)
    .then((tutorial) => {
      if (!tutorial) {
        res.status(404).send({
          message: `Tutorial with id=${id} not found.`,
        });
        return;
      }

      // Check if a file was uploaded
      if (req.files && Object.keys(req.files).length > 0) {
        const file = req.files.file;
        const fileName = file.name;

        // Move the new file to the server
        file.mv(`./public/event/${fileName}`, (err) => {
          if (err) {
            res.status(500).send({
              message: "Error updating Tutorial image.",
            });
            return;
          }

          // Update the Tutorial with the new image file
          tutorial.update({
            title: req.body.title,
            description: req.body.description,
            published: req.body.published ,
            fileName: fileName,
            tags: req.body.tags,
            archived: req.body.archived ,
          })
            .then(() => {
              res.send({
                message: "Tutorial was updated successfully.",
              });
            })
            .catch((err) => {
              res.status(500).send({
                message: "Error updating Tutorial.",
              });
            });
        });
      } else {
        // Update the Tutorial without changing the image
        tutorial.update({
          title: req.body.title,
          description: req.body.description,
          published: req.body.published ,
          tags: req.body.tags,
          archived: req.body.archived ,
        })
          .then(() => {
            res.send({
              message: "Tutorial was updated successfully.",
            });
          })
          .catch((err) => {
            res.status(500).send({
              message: "Error updating Tutorial.",
            });
          });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id,
      });
    });
};


