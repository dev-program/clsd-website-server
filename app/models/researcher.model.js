module.exports = (sequelize, Sequelize) => {
    const Tutorial = sequelize.define("researchers", {
      firstName: {
        type: Sequelize.STRING
      },
      middleName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      suffix: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },

      researchinterest: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      archived: {
        type: Sequelize.BOOLEAN
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