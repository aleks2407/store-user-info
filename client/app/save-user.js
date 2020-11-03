export const saveUserInfo = (event) => {
	event.preventDefault();
	// get user info before post Method
	const userName = document.getElementById('name').value;
	const userLastName = document.getElementById('lastname').value;
	const courseName = document.getElementById('courses').value;
	const graduationDate = document.getElementById('grad').value;
	const userId = document.getElementById('name').dataset.id;

	const userInfo = {
		name: userName,
		lastName: userLastName,
		courses: courseName,
		graduationDate: graduationDate,
		ids: [],
		id: userId,
	};
	// before save check  empty field
	const isFormOk = checkEmpty(userInfo);
	if (isFormOk) {
		refreshForm(); //form submitted and refresh it
		fetch('/api/user', {
			method: 'POST',
			body: JSON.stringify(userInfo),
			headers: {
				'Content-Type': 'application/json; charset=UTF-8',
			},
		})
			.then((res) => {
				if (res.ok) {
					throw res;
				}

				return res.json();
			})
			.catch((err) => console.log(err));
	}
};

/**
 *
 * @param {object} userInfo  check objects values are not empty
 * @return {Boolean} if there is empty field then throw an error to user. There is empty field.
 */

function checkEmpty(userInfo) {
	for (const key in userInfo) {
		if (key === 'id' || key === 'ids') {
			continue;
		}
		if (!Boolean(userInfo[key])) {
			alert(`${key}: is required`);
			return false;
		}
	}
	// no empty field return true then is ready for post
	return true;
}

/**
 * Refresh from
 */

function refreshForm() {
	const userName = (document.getElementById('name').value = '');
	const userLastName = (document.getElementById('lastname').value = '');
	const courseName = (document.getElementById('courses').value = '');
	const graduationDate = (document.getElementById('grad').value = '');
	const userId = (document.getElementById('name').dataset.id = 'null'); //starter id is null
}
