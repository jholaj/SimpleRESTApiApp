const Service = require('../models/serviceModel');
const GenericController = require('./genericController');

class ServiceController extends GenericController {
    constructor() {
        super(Service);
    }
}

module.exports = new ServiceController();