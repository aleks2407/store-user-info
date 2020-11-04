const controllers = require('./controllers.js');
const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();

router.use(bodyParser.json());

// write your routes

// this is middleware will execute  when this path called
router.use('/user', controllers.generateId);

/*Post-Method to store date into a file */
router.post('/user', controllers.addUser); // Add user info , handler.AddUser will write a new file or overwrite
router.get('/',controllers.getAllFiles);  // get all files, handler.getAllFiles will read the data folder and responds with the list
module.exports = router;
