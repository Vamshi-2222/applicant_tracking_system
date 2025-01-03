module.exports = (sequelize, DataTypes) => {
  const SuperVisiorCollection = sequelize.define("superVisiorCollection", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    superVisiorID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return SuperVisiorCollection;
};
