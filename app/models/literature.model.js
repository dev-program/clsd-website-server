module.exports = (sequelize, Sequelize) => {
    const Tutorial = sequelize.define("literatures", {
      title: {
        type: Sequelize.STRING
      },
      link: {
        type: Sequelize.STRING
      },
      doi: {
        type: Sequelize.STRING
      },
      published: {
        type: Sequelize.BOOLEAN
      }
    });
  
    return Tutorial;
  };