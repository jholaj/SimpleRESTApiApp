const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');
const GenericRouter = require('./genericRouter');

const serviceRouter = new GenericRouter(serviceController);

// init
router.use('/', serviceRouter.initializeRoutes());

module.exports = router;