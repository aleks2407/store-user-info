import { firstbuttonHandler } from './main-page.js';
import { saveUserInfo } from './save-user.js';
import { renderAllFiles} from './getAll.js'
document.getElementById('firstpage').addEventListener('click', firstbuttonHandler);

//Post METHOD
document.getElementById('submit').addEventListener('click', saveUserInfo);

// getall METHOD

fetch('/api')
  .then(res => {
    if (!res.ok) {
      throw res;
    }
    return res.json();
  })
  .then(files => {
    renderAllFiles(files);
    
  })
  .catch(err => console.error(err));
