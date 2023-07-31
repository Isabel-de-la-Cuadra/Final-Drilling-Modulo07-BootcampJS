// Import the models from the 'index.js' file in the '../models' directory
const db = require('./../models/index.js');
// Get the 'user' model from the database
const User = db.user;
// Get the 'bootcamp' model from the database
const Bootcamp = db.bootcamp;

/* createUser */
// Function to create a new user in the database
exports.createUser = async(user) => {
    try {
        // Create a new user record in the 'users' table using the 'User' model
        const createdUser = await User.create(user);
        // Return the newly created user object
        return createdUser;
    } catch (err) {
        console.log('Error creating user:', err);
        // Return null if there was an error creating the user
        return null;
    }
}

/* findUserById */
// Function to find a user by their ID in the database
exports.findUserById = async(userId) => {
    // Find the user record with the given ID in the 'users' table using the 'User' model
    const user = await User.findByPk(userId);
    if (!user) {
        console.log(`User with ID ${userId} not found`);
        // Return null if the user with the given ID was not found
        return null;
    }

    // Find the bootcamps associated with the user using a many-to-many association
    const userWithBootcamps = await User.findByPk(userId, {
        include: [{
            // Include the 'bootcamp' model in the query
            model: Bootcamp,
            // Alias for the association
            as: 'bootcamps',
            // Include only the 'title' attribute of the bootcamp
            attributes: ['title'],
            through: {
                // Exclude the join table attributes
                attributes: []
            }
        }]
    });
    // Return the user object with associated bootcamps
    return userWithBootcamps;
}

/* findUserAll */
// Function to find all users in the database with associated bootcamps
exports.findUserAll = async() => {
    // Find all user records in the 'users' table and include associated bootcamps
    const usersWithBootcamps = await User.findAll({
        // Include only 'firstName' and 'lastName' attributes
        attributes: ['firstName', 'lastName'],
        include: [{
            // Include the 'bootcamp' model in the query
            model: Bootcamp,
            // Alias for the association
            as: 'bootcamps',
            // Include only the 'title' attribute of the bootcamp
            attributes: ['title'],
            through: {
                // Exclude the join table attributes
                attributes: []
            }
        }]
    });
    // Return the array of user objects with associated bootcamps
    return usersWithBootcamps;
}

/* updateUserById */
// Function to update a user in the database based on their ID
exports.updateUserById = async(userId, updatedUser) => {
    // Find the user record with the given ID in the 'users' table using the 'User' model
    const user = await User.findByPk(userId);
    if (!user) {
        console.log(`User with ID ${userId} not found`);
        // Return false if the user with the given ID was not found
        return false;
    }

    // Update the user's information in the 'users' table and get the number of rows updated
    const [numRowsUpdated, updatedUsers] = await User.update(updatedUser, {
        where: { id: userId }
    });
    // Return true if at least one row was updated, otherwise false
    return numRowsUpdated > 0;
}


/* deleteUserById */
// Function to delete a user from the database based on their ID
exports.deleteUserById = async(userId) => {
    // Find the user record with the given ID in the 'users' table using the 'User' model
    const user = await User.findByPk(userId);
    if (!user) {
        console.log(`User with ID ${userId} not found`);
        // Return false if the user with the given ID was not found
        return false;
    }

    // Delete the user from the 'users' table and get the number of rows deleted
    const numRowsDeleted = await User.destroy({
        where: { id: userId }
    });
    // Return true if at least one row was deleted, otherwise false
    return numRowsDeleted > 0;
}


/*
Para el usuario, construir los siguientes controladores:
• Crear y guardar usuarios llamado createUser.
• Obtener los Bootcamp de un usuario llamado findUserById.
• Obtener todos los Usuarios incluyendo, los Bootcamp llamado findAll.
• Actualizar usuario por Id llamado updateUserById.
• Eliminar un usuario por Id llamado deleteUserById.
*/