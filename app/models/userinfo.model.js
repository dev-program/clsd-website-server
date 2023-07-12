module.exports = (sequelize, Sequelize) => {
  const Tutorial = sequelize.define("userinfos", {
    title: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    published: {
      type: Sequelize.BOOLEAN
    },
    fileName: {
      type: Sequelize.STRING
    }
  });

  return Tutorial;
};