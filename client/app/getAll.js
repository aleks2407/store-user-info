export const renderAllFiles = (files) => {
 if(files.length === 0){
   document.getElementById('files').innerHTML = ' Sorry! There are no files to show!'

 }else{
  const filesList = files
    .map(fileName => {
      const file = document.createElement('span');
      file.innerHTML = fileName;
      const viewbtn = document.createElement('button')
      viewbtn.innerHTML= 'View';
      viewbtn.className = 'btn btn-light';
      const deletebtn = document.createElement('button');
      deletebtn.innerHTML = 'Delete';
      deletebtn.className = 'btn btn-light';
     
      const li = document.createElement('li');
      li.appendChild(file);
      li.appendChild(viewbtn);
      li.appendChild(deletebtn);

      return li;
    })
    .reduce((all, next) => {
      all.appendChild(next);
      return all;
    }, document.createElement('ul'));
const container = document.getElementById('files');
  container.innerHTML = '';
  container.appendChild(filesList);
}
};

export const getAll = (event)=>{
event.preventDefault();
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

}