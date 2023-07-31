// Import the required modules and controllers
const db = require('./app/models/index.js')
const userController = require('./app/controllers/user.controller.js')
const bootcampController = require('./app/controllers/bootcamp.controller.js')
const enrollmentController = require('./app/controllers/enrollment.controller.js')

// Function to create users
const createUser = async() => {
    // Create users with their information
    const user_01 = await userController.createUser({ firstName: 'Mateo', lastName: 'Díaz', email: 'mateo.diaz@correo.com' })
    const user_02 = await userController.createUser({ firstName: 'Santiago', lastName: 'Mejías', email: 'santiago.mejias@correo.com' })
    const user_03 = await userController.createUser({ firstName: 'Lucas', lastName: 'Rojas', email: 'lucas.rojas@correo.com' })
    const user_04 = await userController.createUser({ firstName: 'Facundo', lastName: 'Fernandez', email: 'facundo.fernandez@correo.com' })
}

// Function to create bootcamps
const createBootcamp = async() => {
    // Create bootcamps with their information
    const bootcamp_01 = await bootcampController.createBootcamp({ title: 'Introduciendo El Bootcamp De React.', cue: 10, description: 'React es la librería más usada en JavaScript para el desarrollo de interfaces.' })
    const bootcamp_02 = await bootcampController.createBootcamp({ title: 'Bootcamp Desarrollo Web Full Stack.', cue: 12, description: 'Crearás aplicaciones web utilizando las tecnologías y lenguajes más actuales y populares, como: JavaScript, nodeJS, Angular, MongoDB, ExpressJS.' })
    const bootcamp_03 = await bootcampController.createBootcamp({ title: 'Bootcamp Big Data, Inteligencia Artificial & Machine Learning.', cue: 18, description: 'Domina Data Science, y todo el ecosistema de lenguajes y herramientas de Big Data, e intégralos con modelos avanzados de Artificial Intelligence y Machine Learning.' })
}

// Function to create enrollments (add users to bootcamps)
const createEnrollment = async() => {
    // Add users to bootcamps with their IDs
    const enrollment_01 = await enrollmentController.addUser(1, 1)
    const enrollment_02 = await enrollmentController.addUser(1, 2)
    const enrollment_03 = await enrollmentController.addUser(2, 1)
    const enrollment_04 = await enrollmentController.addUser(3, 1)
    const enrollment_05 = await enrollmentController.addUser(3, 2)
    const enrollment_06 = await enrollmentController.addUser(3, 4)
}

// Function to query a user by ID, including the Bootcamps he or she is enrolled in
const findUserByIdWithBootcamp = async() => {
    // Defines the user ID (replace '1' with the desired user ID)
    const userId = 1; // Replace 1 with the ID of the user you want to search for
    // Call the 'findUserById' function from the user controller to get the user by its ID
    const user = await userController.findUserById(userId);
    if (!user) {
        // If the user is not found, print a message indicating that it was not found
        console.log(`User with ID ${userId} not found.`);
    } else {
        // Find a user by ID and print the result
        console.log("User with associated bootcamps:");
        console.log(JSON.stringify(user, null, 4));
    }
}

//Function to consult all users with their Bootcamp
const findAllUsersWithBootcamp = async() => {
    // Find all users with their associated bootcamps and print the result
    const query_02 = await userController.findUserAll()
    console.log(JSON.stringify(query_02, null, 4))
}

// Function to update the user according to his or her id; for example: update the user with id=1 by Pedro Sánchez
const updatedUserInformation = async() => {
    const userId = 1; // Replace 1 with the ID of the user you want to search for update
    const updatedUserInformation = { firstName: 'Pedro', lastName: 'Sánchez' }; // New user information to update
    // Update a user by ID and print the result if successful
    const query_03 = await userController.updateUserById(userId, updatedUserInformation)
    if (query_03) {
        // If the update was successful, print the new value of the user
        console.log(`New value of user with ID ${userId}: `, updatedUserInformation);
    } else {
        console.log(`Failed to update user with ID ${userId}`);
    }
}

// Function to delete a user by id: for example: the user with id=1
const deleteUserById = async() => {
    const userId = 1; // Replace 1 with the ID of the user you want to delete
    // Delete a user by ID and print the result
    const query_04 = await userController.deleteUserById(userId);
    if (query_04) {
        // If at least one row was deleted, print the message
        console.log(`User with ID ${userId} was deleted successfully.`);
    } else {
        // If no rows were deleted, print the message
        console.log(`Failed to delete user with ID ${userId}.`);
    }
}

// Function to query the Bootcamp by id, including its users
const findBootcampByIdWithUsers = async() => {
    // Define the bootcamp ID to query (replace '1' with the desired bootcamp ID)
    const bootcampId = 1;
    // Call the 'findById' function from the bootcamp controller to get the bootcamp by its ID
    const query_05 = await bootcampController.findById(bootcampId);
    if (query_05) {
        // If the bootcamp is found, print its information and the users enrolled
        console.log(`Bootcamp with ID ${bootcampId}:`);
        // Print the bootcamp information with indentation for readability
        console.log(JSON.stringify(query_05, null, 4));
    } else {
        // If the bootcamp is not found, print a message indicating that it was not found
        console.log(`Bootcamp with ID ${bootcampId} is not found.`);
    }
}

// Function to consult all Bootcamps, including their users
const findAllBootcampWithUsers = async() => {
    // Call the 'findAll' function from the bootcamp controller to get all bootcamps with their associated users
    const query_06 = await bootcampController.findAll();
    if (query_06) {
        // If bootcamps are found, print their information
        console.log('All bootcamps with associated users:');
        console.log(JSON.stringify(query_06, null, 4));
    } else {
        console.log('No bootcamps found.');
    }
}

// Synchronize the database and execute the queries
db.conexion.sync().then(() => {
    //createUser();
    //createBootcamp();
    //createEnrollment();
    //findUserByIdWithBootcamp();
    //findAllUsersWithBootcamp();
    //updatedUserInformation();
    //deleteUserById();
    //findBootcampByIdWithUsers();
    //findAllBootcampWithUsers()
})

/*
Por último, para verificar los modelos y las relaciones con sus métodos, se crea el archivo
server.js, donde hacemos uso de la base de datos, los modelos y los controladores.
1. Crear los siguientes usuarios:
firstName lastName email
Mateo Díaz mateo.diaz@correo.com
Santiago Mejías santiago.mejias@correo.com
Lucas Rojas lucas.rojas@correo.com
Facundo Fernandez facundo.fernandez@correo.com

2. Crear los siguientes Bootcamp:
title. cue. description
Introduciendo El Bootcamp De React. 10. React es la librería más usada en JavaScript para el desarrollo de interfaces.
Bootcamp Desarrollo Web Full Stack. 12. Crearás aplicaciones web utilizando las tecnologías y lenguajes más actuales y populares, como:
JavaScript, nodeJS, Angular, MongoDB, ExpressJS.
Bootcamp Big Data, Inteligencia Artificial & Machine Learning. 18. Domina Data Science, y todo el ecosistema de lenguajes y herramientas de Big Data, e
intégralos con modelos avanzados de Artificial Intelligence y Machine Learning.

3. Agregar los siguientes usuarios al Bootcamp:
title. usuarios
Introduciendo El Bootcamp De React. Mateo Díaz Santiago Mejías
Bootcamp Desarrollo Web Full Stack. Mateo Díaz
Bootcamp Big Data, Inteligencia Artificial & Machine Learning. Mateo Díaz Santiago Mejías Lucas Rojas

4. Consultar un usuario por id, incluyendo los Bootcamp

5. Consultar todos los usuario con sus Bootcamp

6. Actualizar el usuario según su id; por ejemplo: actualizar el usuario con id=1 por Pedro Sánchez

7. Eliminar un usuario por id: por ejemplo: el usuario con id=1

8. Consultar el Bootcamp por id, incluyendo los usuarios

9. Consultar todos los Bootcamps con sus Usuarios

*/