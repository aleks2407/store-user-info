import { firstbuttonHandler } from './main-page.js';
import { saveUserInfo } from './save-user.js';
import { getAll} from './getAll.js'
import {editUser} from './edit-user.js';
import {deleteUser} from './delete-user.js';


document.getElementById('firstpage').addEventListener('click', firstbuttonHandler);

//Post METHOD
document.getElementById('submit').addEventListener('click', saveUserInfo);

// getall METHOD

document.getElementById('allfiles').addEventListener('click',getAll);


//edit@Tiba
document.querySelector('#edit').addEventListener('click', editUser);

//delete file from UI
document.getElementById('files').addEventListener('click', deleteUser);
