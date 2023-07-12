module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    verificationCode  : {
      type: Sequelize.STRING
    },
    isVerified  : {
      type: Sequelize.BOOLEAN
    }
  });



  return User;
};

