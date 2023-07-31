// Import the models from the 'index.js' file in the '../models' directory
const db = require('./../models/index.js');
// Get the 'user' model from the database
const User = db.user;
// Get the 'bootcamp' model from the database
const Bootcamp = db.bootcamp;

/* addUser */
// Function to add a user to a bootcamp in the database
exports.addUser = async(bootcampId, userId) => {
    try {
        // Find the bootcamp by its ID
        const bootcamp = await Bootcamp.findByPk(bootcampId);
        if (!bootcamp) {
            console.log(`Bootcamp with ID ${bootcampId} not found`);
            // Return false if the bootcamp with the given ID was not found
            return false;
        }

        // Find the user by its ID
        const user = await User.findByPk(userId);
        if (!user) {
            console.log(`User with ID ${userId} not found`);
            // Return false if the user with the given ID was not found
            return false;
        }

        // Add the user to the bootcamp
        await bootcamp.addUser(user);

        // Print the information about the user and the bootcamp with asterisks
        console.log('***************************');
        console.log(`Agregado el usuario id=${user.id} al bootcamp con id=${bootcamp.id}`);
        console.log('***************************');

        // Log the information about the user and the bootcamp
        console.log(`User ${user.firstName} ${user.lastName} added to Bootcamp ${bootcamp.title}`);

        // Return true to indicate that the user was successfully added to the bootcamp
        return true;
    } catch (err) {
        console.log('Error adding user to bootcamp:', err);
        // Return false if there was an error adding the user to the bootcamp
        return false;
    }
}

/*
• Agregar un Usuario al Bootcamp llamado addUser. ESTARÁ EN EL CONTROLADOR enrollment.controller.js por estar ingresando información en la tabla intermedia
*/