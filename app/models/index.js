const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
   
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);


db.tutorials = require("../models/tutorial.model.js")(sequelize, Sequelize);
db.events = require("../models/event.model.js")(sequelize, Sequelize);
db.user_roles = require("../models/user_role.model.js")(sequelize, Sequelize);

db.avps = require("../models/avp.model.js")(sequelize, Sequelize);
db.collections = require("../models/collection.model.js")(sequelize, Sequelize);
db.equipments = require("../models/equipment.model.js")(sequelize, Sequelize);
db.literatures = require("../models/literature.model.js")(sequelize, Sequelize);
db.researchers = require("../models/researcher.model.js")(sequelize, Sequelize);


db.clsd_projects = require("../models/clsd_project.model.js")(sequelize, Sequelize);


db.rnd_projects = require("../models/rnd_project.model.js")(sequelize, Sequelize);
db.publications = require("../models/publication.model.js")(sequelize, Sequelize);

db.userinfos = require("../models/userinfo.model.js")(sequelize, Sequelize);

db.tags = require("../models/tag.model.js")(sequelize, Sequelize);
/*
db.role.belongsToMany(db.user,db.user_roles, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId",
  as: "user", "user_roles",
});

db.user.belongsToMany(db.role, db.user_roles,{
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId", 
    as: "roles","user_roles",
});

db.user_roles.belongsTo(db.user,db.role,  {
  foreignKey: "userId","roleId",
  as: "user","role",
});

*/

db.role.belongsToMany(db.user, {
  through: db.user_roles,
  foreignKey: "roleId",
  otherKey: "userId",
  as: "users",
});

db.user.belongsToMany(db.role, {
  through: db.user_roles,
  foreignKey: "userId",
  otherKey: "roleId",
  as: "roles",
});

db.user_roles.belongsTo(db.user, {
  foreignKey: "userId",
  as: "users",
});

db.user_roles.belongsTo(db.role, {
  foreignKey: "roleId",
  as: "roles",
});






db.ROLES = ["user", "admin", "moderator"];

module.exports = db;

