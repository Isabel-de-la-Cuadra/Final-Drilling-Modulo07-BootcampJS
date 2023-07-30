// Import sequelize library
const Sequelize = require('sequelize')
    // Import the database configuration from de "db.config.js" file
const conexion = require('./../config/db.config.js')

// Defines the "Bootcamp" model
const Bootcamp = conexion.define('bootcamps', {
    // Defines the "titlle" property as a character string that cannot be null
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    // Defines the "cue" property as a ineger that cannot be null and be between 10 and 20
    cue: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            min: 10,
            max: 20
        }
    },
    // Defines the "description" property as a character string that cannot be null
    description: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

// Export the 'Bootcamp' model
module.exports = Bootcamp

/*
• title: cadena de caracteres que define el título del Bootcamp, campo obligatorio.
• cue: número que define la cantidad de sesiones (CUE) que contiene el Bootcamp, campo
obligatorio con las siguientes validaciones: tipo entero con un valor mínimo de 5 CUE y
como máximo 10. POR LA INFORMACIÓN POSTERIOR ENTREGADA, NO SE PUEDE TRABAJAR CON LOS VALORES 
MÍNIMOS ENTREGADOS. LOS MODIFCAMOS A 10 Y 20.
• description: cadena de caracteres que define la descripción o el objetivo del Bootcamp,
campo obligatorio.
*/