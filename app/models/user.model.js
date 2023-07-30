// Import sequelize library
const Sequelize = require('sequelize')
    // Import the database configuration from de "db.config.js" file
const conexion = require('./../config/db.config.js')

// Defines the "User" model
const User = conexion.define('users', {
    // Define the "firstName" property as a character string that cannot be null
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    // Defines the "lastName" property as a character string that cannot be null
    lastName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    // Defines the 'email' property as a character string that must be unique and cannot be null
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        // Add a validation to ensure the 'email' is in the correct format
        validate: {
            isEmail: true
        }
    }
})

// Export the 'User' model
module.exports = User

/*
- firstName: cadena de caracteres y campo obligatorio.
- lastName: cadena de caracteres y campo obligatorio.
- email: campo obligatorio, y con las siguientes validaciones: formato de correo y que sea
único, no repetitivo en la base de datos
*/