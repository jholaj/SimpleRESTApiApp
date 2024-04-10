const GenericModels = require('./genericModels');
const bcrypt = require('bcrypt');


class UserModel extends GenericModels {
    constructor() {
        super('users'); // Table name
    }

    async create(data) {
        try {
            // hash
            if (data.Password) {
                data.Password = await bcrypt.hash(data.Password, 10);
            }
            await this.connect();
            const [result] = await this.connection.query(`INSERT INTO ${this.tableName} SET ?`, data);
            return result.insertId;
        } catch (error) {
            throw error;
        }
    }

    async findByEmailAndPassword(email, password) {
        try {
            await this.connect();
            const [rows] = await this.connection.query('SELECT * FROM users WHERE email = ?', [email]);
            if (rows.length === 0) {
                return null;
            }
            const user = rows[0];
            // comparing hashes
            const passwordMatch = await bcrypt.compare(password, user.Password);
            if (!passwordMatch) {
                return null; // pass doesnt match
            }
            return user;
        } catch (error) {
            throw error;
        }
    }

    async createAdminIfNotExists() {
        try {
            await this.connect();
            const [rows] = await this.connection.query('SELECT * FROM users WHERE role = ?', ['admin']);
            if (rows.length === 0) {
                const hashedPassword = await bcrypt.hash('admin_password', 10); // hashing
                await this.create({
                    name: 'admin',
                    email: 'admin@example.com',
                    password: hashedPassword,
                    role: 'admin'
                });
            }
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new UserModel();