import { firstbuttonHandler } from './main-page.js';
import { saveUserInfo } from './save-user.js';
import { getAll} from './getAll.js'
document.getElementById('firstpage').addEventListener('click', firstbuttonHandler);

//Post METHOD
document.getElementById('submit').addEventListener('click', saveUserInfo);

// getall METHOD

document.getElementById('allfiles').addEventListener('click',getAll);
