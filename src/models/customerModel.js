const GenericModels = require('./genericModels');

class CustomerModel extends GenericModels {
    constructor() {
        super('customers'); // Table name
    }
}

module.exports = new CustomerModel();