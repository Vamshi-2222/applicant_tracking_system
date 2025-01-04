const env = {
  database: 'sql12755591', // Replace with your online database name
  username: 'sql12755591', // Replace with your online MySQL username
  password: 'nibGgIL1Za', // Replace with your online MySQL password
  host: 'sql12.freesqldatabase.com', // Replace with your online MySQL host, e.g., 'db.example.com'
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

module.exports = env;
