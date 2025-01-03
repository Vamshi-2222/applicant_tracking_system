module.exports = (sequelize, DataTypes) => {
  const ManagerCollection = sequelize.define("managerCollection", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    managerID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return ManagerCollection;
};
