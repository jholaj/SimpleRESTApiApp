const { logEvent } = require('../utils/logger');

class GenericController {
    constructor(model) {
        this.model = model;
        this.create = this.create.bind(this);
        this.getAll = this.getAll.bind(this);
        this.getById = this.getById.bind(this);
        this.delete = this.delete.bind(this);
        this.edit = this.edit.bind(this);
    }

    async create(req, res) {
        try {
            const newData = req.body;
            const newItem = await this.model.create(newData);
            logEvent('Record succesfully created: ' + newItem, true);
            res.status(201).json({ message: 'Record succesfully created.', newItem });
        } catch (error) {
            logEvent('Error while creating record:' + error, false);
            console.error('Error while creating record:', error);
            res.status(500).json({ message: 'Error while creating record.' });
        }
    }

    async getAll(req, res) {
        try {
            let items;
            if (req.user.role === 'admin') {
                items = await this.model.getAll();
            } else if (this.model.tableName !== 'customers') {
                const customerId = req.user.customerID;
                if (!customerId) {
                    return res.status(401).json({ message: 'Invalid token.' });
                }
                items = await this.model.getByUserId(customerId);
            }
            logEvent("Getting records from:" + this.model.tableName, true);
            res.status(200).json(items);
        } catch (error) {
            logEvent('Error while getting all records:' + error, false);
            res.status(500).json({ message: 'Internal server error.' });
        }
    }

    async getById(req, res) {
        const itemId = req.params.id;
        try {
            const item = await this.model.getById(itemId);
            if (!item) {
                return res.status(404).json({ message: 'Record not found.' });
            }
            res.status(200).json(item);
            logEvent("Record found: " + item, true);
        } catch (error) {
            logEvent('Error getting record detail:' + error, false);
            res.status(500).json({ message: 'Internal server error.' });
        }
    }

    // only getting data from logged customer
    async getByUserId(customerId) {
        try {
            const items = await this.model.getByUserId(customerId);
            logEvent("Customer: " + customerId + " accessed his data", true);
            return items;
        } catch (error) {
            logEvent('Error getting user data:' + error, false);
            throw error;
        }
    }

    async delete(req, res) {
        const itemId = req.params.id;
        try {
            let deletedItem;
            if (req.user.role === 'admin') {
                deletedItem = await this.model.delete(itemId);
                logEvent("Record: " + itemId + " was deleted by user id: " + req.user.id, true);
            } else if (this.model.tableName !== 'customers') {
                const item = await this.model.getById(itemId);
                if (!item) {
                    logEvent("Record not found." + itemId, false);
                    return res.status(404).json({ message: 'Record not found.' });
                }
                // if user is not owner of the record
                if (item.ID_Customer !== req.user.customerID) {
                    logEvent("User: " + req.user.customerID + " attempted to delete " + itemId, false);
                    return res.status(403).json({ message: 'Forbidden: You do not have permission to delete this record.' });
                }
                deletedItem = await this.model.delete(itemId);
            }
            if (!deletedItem) {
                return res.status(404).json({ message: 'Record not found.' });
            }
            res.status(200).json({ message: 'Record was successfully deleted.', deletedItem });
        } catch (error) {
            console.error('Error while deleting record:', error);
            res.status(500).json({ message: 'Internal server error.' });
        }
    }

    async edit(req, res) {
        const itemId = req.params.id;
        const updatedData = req.body;
        try {
            let updatedItem;
            if (req.user.role === 'admin') {
                updatedItem = await this.model.update(itemId, updatedData);
                logEvent("Record: " + itemId + " was updated by user id: " + req.user.id, true);
            } else if (this.model.tableName !== 'customers') {
                const item = await this.model.getById(itemId);
                if (!item) {
                    return res.status(404).json({ message: 'Record not found.' });
                }
                // if user is owner of the record
                if (item.ID_Customer !== req.user.customerID) {
                    logEvent("User: " + req.user.customerID + " attempted to edit " + itemId, false);
                    return res.status(403).json({ message: 'Forbidden: You do not have permission to edit this record.' });
                }
                updatedItem = await this.model.update(itemId, updatedData);
            }
            if (!updatedItem) {
                return res.status(404).json({ message: 'Record not found.' });
            }
            res.status(200).json({ message: 'Record was successfully updated.', updatedItem });
        } catch (error) {
            logEvent('Error while trying to update record:' + error, false);
            res.status(500).json({ message: 'Internal server error.' });
        }
    }
}

module.exports = GenericController;
