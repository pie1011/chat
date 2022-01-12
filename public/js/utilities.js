
// --- MENU SLIDE-OUT --- //



function openMenu() {
	document.getElementById('menu').classList.add('hidden');
	document.getElementById('close').classList.remove('hidden');
	document.getElementById('chat-side').classList.add('out');
}

function closeMenu() {
	document.getElementById('close').classList.add('hidden');
	document.getElementById('menu').classList.remove('hidden');
	document.getElementById('chat-side').classList.remove('out');
}