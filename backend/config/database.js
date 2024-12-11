// // config/database.js
// import { Sequelize } from 'sequelize';

// const sequelize = new Sequelize('Backend', null, null, {
//   host: 'localhost/MSSQLSERVER',
//   dialect: 'mssql', // Use mssql for SQL Server
//   dialectOptions: {
//     options: {
//       encrypt: false, // Set to true if using Azure
//       trustedConnection: true, // Enables Windows Authentication
//     },
//   },
// });
// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//   })
//   .catch((error) => {
//     console.error('Unable to connect to the database:', error);
//   });


// export default sequelize;

