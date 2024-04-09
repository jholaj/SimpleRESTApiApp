const express = require('express');
const { authenticateToken } = require('../middleware/authMiddleware');

class GenericRouter {
    constructor(controller) {
        this.controller = controller;
        this.router = express.Router();
    }
    
    initializeRoutes() {
        this.router.use(authenticateToken);
        
        this.router.post('/', this.controller.create);
        this.router.get('/', this.controller.getAll);
        this.router.get('/:id', this.controller.getById);
        this.router.delete('/:id', this.controller.delete);
        this.router.put('/:id', this.controller.edit);
        
        return this.router;
    }
}

module.exports = GenericRouter;
