const Customer = require('../models/customerModel');
const GenericController = require('./genericController');

class CustomerController extends GenericController {
    constructor() {
        super(Customer);
    }
}

module.exports = new CustomerController();