const GenericModels = require('./genericModels');

class CustomerModel extends GenericModels {
    constructor() {
        super('Customers'); // Table name
    }
}

module.exports = new CustomerModel();