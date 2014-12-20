// Saves options to chrome.storage
function save_options() {
	var fun = document.getElementById('fun').checked;
	var def = document.getElementById('def').value;
	if(def === "") {
		def = document.getElementById('def').value = ". . .";
	}
	chrome.storage.sync.set({fun: fun, def: def}, function () {
		// Update status to let user know options were saved.
		var status = document.getElementById('status');
		status.textContent = 'Options saved.';
		setTimeout(function () {
			status.textContent = '';
		}, 1000);
	});
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
	chrome.storage.sync.get({fun: false, def: '. . .'}, function (items) {
		document.getElementById('fun').checked = items.fun;
		document.getElementById('def').value = items.def;
	});
}

document.addEventListener('DOMContentLoaded', restore_options);

document.getElementById('save').addEventListener('click', save_options);