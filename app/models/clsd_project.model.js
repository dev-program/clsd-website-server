module.exports = (sequelize, Sequelize) => {
    const Tutorial = sequelize.define("clsd_projects", {
      title: {
        type: Sequelize.STRING
      },
      project_leader: {
        type: Sequelize.STRING
      },
      implementing_agency: {
        type: Sequelize.STRING
      },
      archived: {
        type: Sequelize.BOOLEAN
      },
      published: {
        type: Sequelize.BOOLEAN
      },
    });
  
    return Tutorial;
  };