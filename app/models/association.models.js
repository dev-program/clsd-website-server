module.exports = (User, Role) => {
    User.belongsToMany(Role, { through: "user_roles", foreignKey: "userId" });
    Role.belongsToMany(User, { through: "user_roles", foreignKey: "roleId" });
  };
  