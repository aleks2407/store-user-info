export const deleteUser = (event)=> {
    // debugger;
     const target = event.target;
     if (!target.dataset.remove){
         return
     }
     const userFileName = target.parentElement.firstChild.innerHTML;
     target.parentElement.remove();
     fetch('api/delete', {
         method: 'delete',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ deletedFile: userFileName }),
     })
         .then((res) => {
             console.log(typeof res);
             if (res.ok) {
                 throw res;
             }
             return res.json();
         })
         .catch((err) => console.log(err));
 };
 