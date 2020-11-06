'use strict';

export const editUser = () => {

    const name = document.getElementById('name').value;
	const lastName = document.getElementById('lastname').value;
	const courses = document.getElementById('courses').value;
	const graduationDate = document.getElementById('grad').value;


	const userData = {name,lastName,courses,graduationDate};
	
		fetch('/api/user/edit', {
			method: 'PUT',
			body: JSON.stringify(userData),
			headers: {
				'Content-Type': 'application/json; charset=UTF-8',
			},
		})
			.then((res) => {
				if (!res.ok) {
					throw res;
				}
				return res.json();
            })
            .then(parsedResponse => {
                //console.log(parsedResponse);
                alert(parsedResponse);
              })
            .catch((err) => err.json())
            .then((parsedErr) => {
				if(parsedErr){
					console.log(parsedErr)
                alert(`${parsedErr.error.dataPath.slice(1,10)} must be ${parsedErr.error.message.split(',')[1]} characters`);
				}
                
            })
	
};
