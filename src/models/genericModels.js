// databaseModel.js
const mysql = require('mysql2/promise');
const config = require('../config/database');

class GenericModels {
    constructor(tableName) {
        this.tableName = tableName;
        this.connection = mysql.createConnection(config);
    }

    async connect() {
        this.connection = await mysql.createConnection(config);
    }

    async create(data) {
        try {
            await this.connect();
            const [result] = await this.connection.query(`INSERT INTO ${this.tableName} SET ?`, data);
            return result.insertId;
        } catch (error) {
            throw error;
        }
    }

    async getAll() {
        try {
            await this.connect();
            const [rows] = await this.connection.query(`SELECT * FROM ${this.tableName}`);
            return rows;
        } catch (error) {
            throw error;
        }
    }

    async getById(id) {
        try {
            await this.connect();
            const [rows] = await this.connection.query(`SELECT * FROM ${this.tableName} WHERE ID = ?`, [id]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    async getByUserId(customerId) {
        try {
            await this.connect();
            const [rows] = await this.connection.query(`SELECT * FROM ${this.tableName} WHERE ID_Customer = ?`, [customerId]);
            return rows;
        } catch (error) {
            throw error;
        }
    }

    async update(id, data) {
        try {
            await this.connect();
            const [result] = await this.connection.query(`UPDATE ${this.tableName} SET ? WHERE ID = ?`, [data, id]);
            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }

    async delete(id) {
        try {
            await this.connect();
            const [result] = await this.connection.query(`DELETE FROM ${this.tableName} WHERE ID = ?`, [id]);
            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = GenericModels;
