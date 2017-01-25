// Saves options to chrome.storage
function save_options() {
	var title = document.getElementById('title').value;
	if(title === "") {
		title = document.getElementById('title').value = chrome.i18n.getMessage("default_title");
	}
	chrome.storage.sync.set({title: title, font: document.getElementById('font').checked, content: document.getElementById('content').value}, function() {
		chrome.storage.local.set({disabled: document.getElementById('disabled').checked}, function() {
			// Visually indicate that options were saved.
			var save = document.getElementById('save');
			var defaultSaveText = save.innerText;
			save.innerText = '✅ Saved';
			setTimeout(function() {
				save.innerText = defaultSaveText;
			}, 1000);
		});
	});
}

// Update form element states using the preferences stored in chrome.storage.
function init_options() {
	chrome.storage.sync.get({font: true, title: chrome.i18n.getMessage("default_title"), content: chrome.i18n.getMessage("default_content")}, function(items) {
		document.getElementById('font').checked = items.font;
		document.getElementById('title').value = items.title;
		document.getElementById('content').value = items.content;
	});

	chrome.storage.local.get({disabled: false}, function(items) {
		document.getElementById('disabled').checked = items.disabled;
	});

	document.getElementById('save').addEventListener('click', save_options);
}

document.addEventListener('DOMContentLoaded', init_options);

document.addEventListener("keydown", function(e) {
	if ((e.which == '115' || e.which == '83' ) && (e.ctrlKey || e.metaKey)) {
		e.preventDefault();
		save_options();
		return false;
	}
	return true;
});