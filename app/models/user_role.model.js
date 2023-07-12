module.exports = (sequelize, Sequelize) => {
  const Role = sequelize.define("user_roles", {
    
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: Sequelize.INTEGER
    },
    roleId: {
      type: Sequelize.INTEGER
    }

  });

  return Role; 
};
