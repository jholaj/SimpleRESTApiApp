const GenericModels = require('./genericModels');

class ServiceModel extends GenericModels {
    constructor() {
        super('services'); // Table name
    }
}

module.exports = new ServiceModel();