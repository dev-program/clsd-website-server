module.exports = (sequelize, Sequelize) => {
    const Tutorial = sequelize.define("publications", {
      title: {
        type: Sequelize.STRING
      },
      degree: {
        type: Sequelize.STRING
      },
      adviser: {
        type: Sequelize.STRING
      }, 
      year: {
        type: Sequelize.STRING
      },
      student: {
        type: Sequelize.STRING
      },
      types: {
        type: Sequelize.STRING
      },
      archived: {
        type: Sequelize.BOOLEAN
      },
      published: {
        type: Sequelize.BOOLEAN
      }
    });
  
    return Tutorial;
  };


