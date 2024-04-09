const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const GenericRouter = require('./genericRouter');

const customerRouter = new GenericRouter(customerController);

// init
router.use('/', customerRouter.initializeRoutes());

module.exports = router;