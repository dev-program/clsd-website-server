const fs = require('fs');
const path = require('path');

module.exports = function(app) {
  app.get("/api/event-content/:name", (req, res) => {
    var name = req.params.name;
    var file = fs.createReadStream(path.join(__dirname, "../../public/event/", name));
    file.pipe(res);
  });

  app.get("/api/collection-content/:name", (req, res) => {
    var name = req.params.name;
    var file = fs.createReadStream(path.join(__dirname, "../../public/collection/", name));
    file.pipe(res);
  });

  app.get("/api/avp-content/:name", (req, res) => {
    var name = req.params.name;
    res.writeHead(200, {'Content-Type': 'video/mp4'});
    var file = fs.createReadStream(path.join(__dirname, "../../public/avp/", name));
    file.pipe(res);
  });

  app.get("/api/equipment-content/:name", (req, res) => {
    var name = req.params.name;
    var file = fs.createReadStream(path.join(__dirname, "../../public/equipment/", name));
    file.pipe(res);
  });

  app.get("/rrl/:name", (req, res) => {
    var name = req.params.name;
    var file = fs.createReadStream(path.join(__dirname, "../../public/literature/", name));
    file.pipe(res);
  });

  app.get("/clsd_project/:name", (req, res) => {
    var name = req.params.name;
    var file = fs.createReadStream(path.join(__dirname, "../../public/clsd_project/", name));
    file.pipe(res);
  });

  app.get("/rnd_project/:name", (req, res) => {
    var name = req.params.name;
    var file = fs.createReadStream(path.join(__dirname, "../../public/rnd_project/", name));
    file.pipe(res);
  });

  app.get("/api/researcher-content/:name", (req, res) => {
    var name = req.params.name;
    var file = fs.createReadStream(path.join(__dirname, "../../public/researcher/", name));
    file.pipe(res);
  });
};
