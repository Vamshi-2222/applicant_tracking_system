module.exports = (sequelize, DataTypes) => {
  const TeamLeadCollection = sequelize.define("teamLeadCollection", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    teamLeadID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return TeamLeadCollection;
};
