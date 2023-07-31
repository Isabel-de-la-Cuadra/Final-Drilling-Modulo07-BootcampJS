// Import the models from the 'index.js' file in the '../models' directory
const db = require('./../models/index.js');
// Get the 'user' model from the database
const User = db.user;
// Get the 'bootcamp' model from the database
const Bootcamp = db.bootcamp;

/* createBootcamp */
// Function to create a new bootcamp in the database
exports.createBootcamp = async(bootcamp) => {
    try {
        // Create a new bootcamp record in the 'bootcamps' table using the 'Bootcamp' model
        const bootcampRegistration = await Bootcamp.create(bootcamp);
        // Return the newly created bootcamp object
        return bootcampRegistration;
    } catch (err) {
        console.log('Error creating bootcamp:', err);
        // Return null if there was an error creating the bootcamp
        return null;
    }
}

/* findById */
// Function to find a bootcamp by its ID in the database
exports.findById = async(bootcampId) => {
    try {
        // Find the bootcamp record with the given ID in the 'bootcamps' table using the 'Bootcamp' model
        const bootcamp = await Bootcamp.findByPk(bootcampId, {
            // Specify the attributes of the bootcamps to include in the result
            attributes: ['title'],
            // Include the 'users' model in the query and get the firstName and lastName attributes of users
            include: [{
                model: User,
                as: 'users', // Alias for the association
                attributes: ['firstName', 'lastName'], // Include firstName and lastName attributes of 'users' model
                // Do not include the association attributes in the result
                through: { attributes: [] }
            }, ],
        });

        if (!bootcamp) {
            throw new Error(`Bootcamp with ID ${bootcampId} not found`);
        }

        // Return the bootcamp object found by its ID with the users' firstName and lastName attributes
        return bootcamp;
    } catch (err) {
        console.log('Error finding bootcamp by ID:', err);
        // Return null if there was an error finding the bootcamp
        return null;
    }
};

/* findAll */
// Function to find all bootcamps including their associated users in the database
exports.findAll = async() => {
    try {
        // Find all bootcamp records in the 'bootcamps' table, including their associated users
        const bootcamps = await Bootcamp.findAll({
            // Specify the attributes of the bootcamps to include in the result
            attributes: ['title'],
            include: [{
                // Include the 'User' model
                model: User,
                // Use the alias 'users' for the association
                as: 'users',
                // Specify the attributes of the users to include in the result
                attributes: ['firstName', 'lastName'],
                // Do not include the association attributes in the result
                through: { attributes: [] }
            }]
        });
        // Return the array of bootcamps with their associated users
        return bootcamps;
    } catch (err) {
        console.log('Error finding all bootcamps:', err);
        // Return null if there was an error finding the bootcamps
        return null;
    }
}

/*
Para el Bootcamp, construir los siguientes controladores:
• Crear y guardar un nuevo Bootcamp llamado createBootcamp.
• Agregar un Usuario al Bootcamp llamado addUser. ESTARÁ EN EL CONTROLADOR enrollment.controller.js por estar ingresando información en la tabla intermedia
• Obtener los Bootcamp por id llamado findById.
• Obtener todos los Usuarios incluyendo los Bootcamp llamado findAll.
*/