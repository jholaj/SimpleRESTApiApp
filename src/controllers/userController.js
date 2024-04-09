const User = require('../models/userModel');
const GenericController = require('./genericController');

class UserController extends GenericController {
    constructor() {
        super(User);
    }
}

module.exports = new UserController();