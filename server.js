const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const fs = require('fs');
const path = require('path');
require('dotenv').config();
const config = require("./config/index");
const compression = require("compression");
const helmet = require("helmet");
const { allowedDomains } = config;

const app = express();

app.use(cors({ origin: allowedDomains }));

//app.use(helmet());
//app.use(compression());

app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// configure middleware
app.use(fileUpload());


// Allow CORS headers
app.use(function(req, res, next) {
  res.setHeader("Permissions-Policy", ""); // Remove the unrecognized feature
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to CLSD application." });
});
/*
const multer = require('multer');
app.use(fileUpload());

const upload = multer({ dest: 'uploads/' });
app.post('/api/items', upload.single('image'), async (req, res) => {
  const { name, description } = req.body;
  const image = req.file ? req.file.filename : null;
  const item = await Item.create({ name, description, image });
  res.json({ id: item.id });
});
*/

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

require('./app/routes/calendar.routes')(app);


require('./app/routes/image.routes')(app);



const PORT = config.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});