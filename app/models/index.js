// Import the database configuration from the "db.config.js" file
const conexion = require('./../config/db.config.js');

// Defines 'db' that contains references to database models
const db = {
    conexion: conexion, // Store the database connection object
    user: require('./user.model.js'), // Import and store the 'user' model
    bootcamp: require('./bootcamp.model.js') // Import and store the 'bootcamp' model
}

// Defines a many-to-many association between 'user' and 'bootcamp' models
db.user.belongsToMany(db.bootcamp, {
    through: 'user_bootcamp', // Using a join table called 'user_bootcamp'
    as: 'bootcamps', // Alias for the association when used in queries
    foreignKey: 'user_id' // Foreign key in the 'user_bootcamp' table for the 'user' model
});

db.bootcamp.belongsToMany(db.user, {
    through: 'user_bootcamp', // Using a join table called 'user_bootcamp'
    as: 'users', // Alias for the association when used in queries
    foreignKey: 'bootcamp_id' // Foreign key in the 'user_bootcamp' table for the 'bootcamp' model
});

// Export the 'db' object which contains the database configuration and models
module.exports = db;