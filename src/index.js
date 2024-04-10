const express = require('express');
const mysql = require('mysql2/promise');
const config = require('./config/database');
const app = express();
const port = process.env.PORT || 3000;

const UserModel = require('./models/userModel');
const { logEvent } = require('./utils/logger');

// connect db
const connectToDatabase = async () => {
  try {
    const connection = await mysql.createConnection(config);
    logEvent('Connecting to database was succesful with ID: ' + connection.threadId, true);
    return connection;
  } catch (err) {
    logEvent('Error connecting to database:' + err.stack, false);
    throw err;
  }
};

app.use(async (req, res, next) => {
  try {
    req.connection = await connectToDatabase();
    next();
  } catch (err) {
    logEvent('Error connecting to database:', err.stack, false);
    res.status(500).send('Error connecting to database');
  }
});

app.use(express.json());

app.use('/customers', require('./routes/customerRoutes')); // customers
app.use('/services', require('./routes/serviceRoutes'));   // services
app.use('/users', require('./routes/userRoutes'));         // users
app.use('/login', require('./routes/loginRoute'));         // login

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// starting server
(async () => {
  try {
      logEvent('App has been started', true);
      // creating admin
      await UserModel.createAdminIfNotExists();
      logEvent('Admin user was created', true);
      app.listen(port, () => {
          console.log(`Server is running on port ${port}`);
      });
  } catch (error) {
      logEvent('Error during server initialization: ' + error, false);
  }
})();