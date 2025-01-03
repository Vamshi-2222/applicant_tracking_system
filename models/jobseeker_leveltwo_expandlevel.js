module.exports = (sequelize, DataTypes) => {
  const JobSeekerLevelTwoAssessmentExpandLevel = sequelize.define(
    "JobSeekerLevelTwoAssessmentExpandLevel",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      Assessment: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Client: {
        type: DataTypes.STRING,
        defaultValue: "NONE",
      },
      process: {
        type: DataTypes.STRING,
        defaultValue: "NONE",
      },
      questionerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      remark: {
        type: DataTypes.STRING,
        defaultValue: "NONE",
      },
      documentCheck: {
        type: DataTypes.STRING,
        defaultValue: "No",
      },
      trainingStatus: {
        type: DataTypes.STRING,
        defaultValue: "No",
      },
      InterviewStatus: {
        type: DataTypes.STRING,
        defaultValue: "NONE",
      },
      InterviewRemark: {
        type: DataTypes.STRING,
        defaultValue: "NONE",
      },
      addedBy: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }
  );

  return JobSeekerLevelTwoAssessmentExpandLevel;
};
