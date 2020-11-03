import { firstbuttonHandler } from './main-page.js';
import { saveUserInfo } from './save-user.js';

document.getElementById('firstpage').addEventListener('click', firstbuttonHandler);

//Post METHOD

document.getElementById('submit').addEventListener('click', saveUserInfo);
