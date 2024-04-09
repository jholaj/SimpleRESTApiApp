const GenericModels = require('./genericModels');

class ServiceModel extends GenericModels {
    constructor() {
        super('Services'); // Table name
    }
}

module.exports = new ServiceModel();