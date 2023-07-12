module.exports = (sequelize, Sequelize) => {
    const Tutorial = sequelize.define("equipments", {
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
      },
      tags: {
        type: Sequelize.STRING
      },
      archived: {
        type: Sequelize.BOOLEAN
      }
    });
  
    return Tutorial;
  };