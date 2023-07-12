module.exports = (sequelize, Sequelize) => {
  const Tag = sequelize.define("tags", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    }
  });

  return Tag;
};
