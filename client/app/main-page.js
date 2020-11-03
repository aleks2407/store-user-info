const opening = document.getElementById('opening');
const container = document.getElementById('container');
const aside = document.getElementById('aside');
const btn = document.getElementById('firstpage');

export function firstbuttonHandler(event) {
	//debugger;
	event.preventDefault();
	opening.style.display = 'none';
	btn.style.display = 'none';
	container.style.display = 'block';
	aside.style.display = 'block';
}
