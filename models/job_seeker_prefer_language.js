module.exports = (sequelize, DataTypes) => {
  const JobSeekerPreferLanguage = sequelize.define("JobSeekerPreferLanguage", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    LanguageTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    levelone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    leveltwo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  return JobSeekerPreferLanguage;
};
