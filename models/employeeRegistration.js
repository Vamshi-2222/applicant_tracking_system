module.exports = (sequelize, DataTypes) => {

    const EmployeeRegistration = sequelize.define("EmployeeRegistration", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      fullName: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      employeeId: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      phoneNumberOne: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      phoneNumberTwo: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      phoneNumberthree: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      phoneNumberfour: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      emailOne: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      emailTwo: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      emailThree: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      emailFour: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      address: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      dob: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      recruiterType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      doj: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      accountAccess: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      onboarding: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "PENDING",
      },
      documentation: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "PENDING",
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      addedBy: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });

    return EmployeeRegistration;

};