const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const GenericRouter = require('./genericRouter');

const userRouter = new GenericRouter(userController);

// init
router.use('/', userRouter.initializeRoutes());

module.exports = router;