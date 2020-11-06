'use strict';

const fs = require('fs');
const path = require('path');
const Joi = require('joi');
const chalk = require('chalk');
const config = require('../config');

// util package@Tiba
const util = require('util');
const tv4 = require('tv4');

const DATA_DIR = path.join(__dirname, '..', config.DATA_DIR);
const ID_DIR = path.join(__dirname, '..', config.ID_DIR);

// schema to validate user input@Tiba
const USER_SCHEMA = require('../middleware/user-schema.json');

// read and write files with promise @Tiba
const writeFile = util.promisify(fs.writeFile);
const readDir = util.promisify(fs.readdir)

const controllers = {
	addUser: (req, res, next) => {
		const userInfo = req.body;
		console.log('User Name: ', chalk.blue(userInfo.name));
		console.log('this is user info', userInfo);

		const fileName = `${userInfo.name}`; // make a file with user name

		// check user has id or not

		if (isNaN(userInfo.id)) {
			// if user id not defined assign a new one
			const sortedIds = orderIds(userInfo.ids);

			userInfo.id = sortedIds[sortedIds.length - 1] + 1; //new id
			// store id in ids array
			userInfo.ids.push(userInfo.id);
		}
		console.log('userId', userInfo.id);
		const storeUserInfo = Object.assign({}, userInfo);
		delete storeUserInfo['ids']; // we do not want to ids store in user info
		// write file in data directory
		// before send file parse body  to the string.
		fs.writeFile(`${DATA_DIR}/${fileName}-${storeUserInfo.id}.json`, JSON.stringify(storeUserInfo), (err) => {
			if (err && err.code === 'ENOENT') {
				console.log(err);
				res.status(404).end();
				return;
			}
			if (err) {
				console.log(err);
				next(err);
				return;
			}
			console.log(chalk.yellow(` message: '${userInfo.name}'s data  saved to ${fileName}`));
			//	res.json({ message: `'${userInfo.name}'s data' saved to ${fileName}` });
		});

		// write ids file
		fs.writeFile(`${ID_DIR}/id.json`, JSON.stringify(userInfo.ids), (err) => {
			if (err && err.code === 'ENOENT') {
				console.log(err);
				res.status(404).end();
				return;
			}
			if (err) {
				console.log(err);
				next(err);
				return;
			}
			console.log(chalk.redBright(` message: '${userInfo.name}'s id  saved to id.json`));
		});
	},

	generateId: (req, res, next) => {
		// first read ids stored IDS

		fs.readFile(`${ID_DIR}/id.json`, (err, ids) => {
			if (err && err.code === 'ENOENT') {
				console.log(err);
				res.status(404).end();
				return;
			}
			if (err) {
				console.log(err);
				next(err);
				return;
			}

			// to use ids in the post method stored ids property
			req.body.ids = JSON.parse(ids);
			next();
		});
	},
getAllFiles:(req,res,next)=>{			// get all .json files that are in the data folder 
		fs.readdir(DATA_DIR,(err,list)=>{
			if (err && err.code === 'ENOENT') {
      res.status(404).end();
      return;
    }
    if (err) {
      next(err);
      return;
    }
    res.json(list)


		})

	},


	/*  
 URL: '/user', method: PUT 
read files ==> modify the required ==> write it back to the file system@Tiba >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
*/
editUser:  async  (req, res) => {
	const userData = req.body;
   
   const isValid = tv4.validate(userData, USER_SCHEMA)

   if (!isValid) {
	 const error = tv4.error
	 console.error(error)

	 res.status(400).json({
	   error: {
		 message: error.message,
		 dataPath: error.dataPath
	   }
	 })
	 return
   } 

	try {
	 const userFiles = await readDir(DATA_DIR);

	 
	 const userFilesNoExt = userFiles.map(file => path.parse(file).name.split('-')[0]);
	 const nameToBeUpdate = req.body.name;

	   if (userFilesNoExt.includes(nameToBeUpdate)) {

	  const indexOfUser = userFilesNoExt.indexOf(nameToBeUpdate);
	  console.log(indexOfUser);
	  const fileName = userFiles[Number(indexOfUser)];
	  
	  const idToBeUpdate = path.parse(fileName).name.split('-')[1];
	  const newUser = Object.assign({}, userData);
	  newUser.id = idToBeUpdate;
	  delete newUser['ids'];
	   const newUserDataString = JSON.stringify(newUser, null, '  ');

	   await writeFile(`${DATA_DIR}/${fileName}`, newUserDataString);

	   res.json(`${nameToBeUpdate} has been edited`);
	 } else {
	   res.json(`no entry with name ${nameToBeUpdate}`);
	 } 

   } catch (err) {
	 console.log(err);

	 if (err && err.code === 'ENOENT') {
	   res.status(404).end();
	   return;
	 }


   } 
 }
// End of Edit

};

/**
 * @param {array} ids, sort  the ids array by number from  lower to higher
 * @return {array} sorted
 * // https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_sort2
 */

const orderIds = (ids) => {
	return ids.sort((a, b) => {
		return a - b;
	});
};

module.exports = controllers;
