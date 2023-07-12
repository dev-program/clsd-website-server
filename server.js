const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const fs = require('fs');
const path = require('path');
require('dotenv').config();
const config = require("./config");
const compression = require("compression");
const helmet = require("helmet");
const { port, allowedDomains } = config;

const app = express();


app.use(cors({origin: allowedDomains}));
app.use(helmet());
app.use(compression());






/*
//const app = express();
app. use(function(req, res, next) {
  res. header("Access-Control-Allow-Origin", "*");
  res. header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
  });
*/


const multer = require('multer');
app.use(fileUpload());

const upload = multer({ dest: 'uploads/' });
app.post('/api/items', upload.single('image'), async (req, res) => {
  const { name, description } = req.body;
  const image = req.file ? req.file.filename : null;
  const item = await Item.create({ name, description, image });
  res.json({ id: item.id });
});

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// database
const db = require("./app/models");

const Role = db.role;


db.sequelize.sync();
// force: true will drop the table if it already exists
// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Database with { force: true }');
//   initial();
// });

/*
// force: true will drop the table if it already exists
 db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync Database with { force: true }');
  initial();
 });
*/

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to CLSD application." });
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/user_role.routes')(app);

require('./app/routes/tutorial.routes')(app);
require('./app/routes/event.routes')(app);
require('./app/routes/collection.routes')(app);
require('./app/routes/avp.routes')(app);
require('./app/routes/literature.routes')(app);
require('./app/routes/equipment.routes')(app);
require('./app/routes/researcher.routes')(app);

require('./app/routes/clsd_project.routes')(app);
require('./app/routes/rnd_project.routes')(app);
require('./app/routes/publication.routes')(app);

require('./app/routes/userinfo.routes')(app);

require('./app/routes/tag.routes')(app);




/*
app.use(
  fileUpload({
    createParentPath: true,
    limits: {
      fileSize: 2 * 1024 * 1024 * 1024, //2MB max file(s) size
    },
  })
);
*/

// configure middleware
app.use(fileUpload());

// set port, listen for requests
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.create({
    id: 1,
    name: "user"
  });
 
  Role.create({
    id: 2,
    name: "moderator"
  });
 
  Role.create({
    id: 3,
    name: "admin"
  });
}


/* Public */
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public/event'));
app.use(express.static('public/collection'))
app.use(express.static('public/avp'));
app.use(express.static('public/equipment'));
app.use(express.static('public/literature'));
app.use(express.static('public/clsd_project'));
app.use(express.static('public/rnd_project'));
app.use(express.static('public/researcher'));

/* image */
app.get("/api/event-content/:name", (req, res) => {
  var name = req.params.name;
  var file = fs.createReadStream( "./public/event/"+ name );
  file.pipe(res);
});

app.get("/api/collection-content/:name", (req, res) => {
  var name = req.params.name;
  var file = fs.createReadStream( "./public/collection/"+ name );
  file.pipe(res);
});


app.get("/api/avp-content/:name", (req, res) => {
  var name = req.params.name
  res.writeHead(200, {'Content-Type': 'video/mp4'});
  var file = fs.createReadStream( "./public/avp/"+ name );
  file.pipe(res);
});

app.get("/api/equipment-content/:name", (req, res) => {
  var name = req.params.name
  var file = fs.createReadStream( "./public/equipment/"+ name );
  file.pipe(res);
});

app.get("/rrl/:name", (req, res) => {
  var name = req.params.name
  var file = fs.createReadStream( "./public/literature/"+ name );
  file.pipe(res);
});
app.get("/clsd_project/:name", (req, res) => {
  var name = req.params.name
  var file = fs.createReadStream( "./public/clsd_project/"+ name );
  file.pipe(res);
});
app.get("/rnd_project/:name", (req, res) => {
  var name = req.params.name
  var file = fs.createReadStream( "./public/rnd_project/"+ name );
  file.pipe(res);
});


app.get("/api/researcher-content/:name", (req, res) => {
  var name = req.params.name
  var file = fs.createReadStream( "./public/researcher/"+ name );
  file.pipe(res);
});

