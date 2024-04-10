# Simple REST Api App

This application is a customer records management tool providing an API interface for data manipulation.

## Features

- **Customer Records Management**: Ability to add, update, view, and delete customer records.
- **Service Management**: Capability to manage provided services and associate them with specific customers.
- **Authentication and Authorization**: API security using JWT token, allowing authorized access only for registered users.

## Installation

- To run this application, you need to install the following dependencies:

1. **Node.js** - [Download Node.js from the official website](https://nodejs.org/)

After installing Node.js, follow these steps:

1. Clone this repository to your local machine.
2. In the project directory, run the command `npm install` to install all the necessary dependencies.

## Running
### Locally
After successful installation, you can run the application using the following command:
```bash
npm start
```
- This command will start the application and listen on the default port.
### Docker
This application can also be run using Docker. Simply run the following command:
```bash
docker-compose up
```
## Example of usage
### Getting data
#### All
```bash
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" http://localhost:3000/customers
#### Specific
```bash
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" http://localhost:3000/customers/1
```
### Creating
```bash
curl -X POST -H "Authorization: Bearer YOUR_JWT_TOKEN" -H "Content-Type: application/json" -d '{"name":"New Customer"}' http://localhost:3000/customers
```
### Updating
```bash
curl -X PUT -H "Authorization: Bearer YOUR_JWT_TOKEN" -H "Content-Type: application/json" -d '{"name":"Updated Customer"}' http://localhost:3000/customers/1
```
### Deleting
```bash
curl -X DELETE -H "Authorization: Bearer YOUR_JWT_TOKEN" http://localhost:3000/customers/1
```
## Config
- Some parts of this application may require configuration, such as database settings or authentication parameters. This configuration can be done by editing the *config.js* file.

## Database Schema (MYSQL)

### Customers Table

| Column       | Type         |
|--------------|--------------|
| `ID` (PK)    | INT          |
| `Name`       | VARCHAR(255) |
| `Email`      | VARCHAR(255) |
| `Telephone`  | VARCHAR(20)  |
| `Address`    | VARCHAR(255) |

### Services Table

| Column        | Type          |
|---------------|---------------|
| `ID` (PK)     | INT           |
| `Name`        | VARCHAR(255)  |
| `Description` | TEXT          |
| `Price`       | DECIMAL(10,2) |
| `ID_Customer` | INT (FK)      |

### Users Table

| Column        | Type                    |
|---------------|-------------------------|
| `ID` (PK)     | INT                     |
| `Name`        | VARCHAR(255)            |
| `Email`       | VARCHAR(255)            |
| `Password`    | VARCHAR(255)            |
| `Role`        | ENUM('admin', 'customer') |
| `ID_Customer` | INT (FK)                |

