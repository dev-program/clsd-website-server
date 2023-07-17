module.exports = (sequelize, Sequelize) => {
  const Tutorial = sequelize.define("calendars", {
    title: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    published: {
      type: Sequelize.BOOLEAN
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
    
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
    
    },
  });

  return Tutorial;
};
