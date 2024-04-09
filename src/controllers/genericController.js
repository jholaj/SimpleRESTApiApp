// genericController.js
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
            res.status(201).json({ message: 'Record succesfully creared.', newItem });
        } catch (error) {
            console.error('Error while creating record:', error);
            res.status(500).json({ message: 'Error while creating record.' });
        }
    }

    async getAll(req, res) {
        try {
            let items;
            if (req.user.role === 'admin') {
                items = await this.model.getAll();
            } else if (this.model.tableName !== 'Customers') {
                const customerId = req.user.customerID;
                if (!customerId) {
                    return res.status(401).json({ message: 'Invalid token.' });
                }
                items = await this.model.getByUserId(customerId);
            }
            console.log("Getting records from:", this.model.tableName);
            res.status(200).json(items);
        } catch (error) {
            console.error('Error while getting all records:', error);
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
        } catch (error) {
            console.error('Error getting record detail:', error);
            res.status(500).json({ message: 'Internal server error.' });
        }
    }

    async getByUserId(customerId) {
        try {
            const items = await this.model.getByUserId(customerId);
            return items;
        } catch (error) {
            throw error;
        }
    }

    async delete(req, res) {
        const itemId = req.params.id;
        try {
            let deletedItem;
            if (req.user.role === 'admin' || this.model.tableName === 'Customers') {
                deletedItem = await this.model.delete(itemId);
            } else {
                const item = await this.model.getById(itemId);
                if (!item) {
                    return res.status(404).json({ message: 'Record not found.' });
                }
                // if user is owner of the record
                if (item.ID_Customer !== req.user.customerID) {
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
            if (req.user.role === 'admin' || this.model.tableName === 'Customers') {
                updatedItem = await this.model.update(itemId, updatedData);
            } else {
                const item = await this.model.getById(itemId);
                if (!item) {
                    return res.status(404).json({ message: 'Record not found.' });
                }
                // if user is owner of the record
                if (item.ID_Customer !== req.user.customerID) {
                    return res.status(403).json({ message: 'Forbidden: You do not have permission to edit this record.' });
                }
                updatedItem = await this.model.update(itemId, updatedData);
            }
            if (!updatedItem) {
                return res.status(404).json({ message: 'Record not found.' });
            }
            res.status(200).json({ message: 'Record was successfully updated.', updatedItem });
        } catch (error) {
            console.error('Error while trying to update record:', error);
            res.status(500).json({ message: 'Internal server error.' });
        }
    }
}

module.exports = GenericController;
