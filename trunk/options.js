// Saves options to chrome.storage
function saveOptions() {
	var title = document.getElementById('title').value;
	if(title === "") {
		title = document.getElementById('title').value = chrome.i18n.getMessage("default_title");
	}
	chrome.storage.sync.set({
		title: title,
		font: document.getElementById('font').checked,
		content: document.getElementById('content').value
	}, function() {
		// Visually indicate that options were saved.
		var save = document.getElementById('save');
		var defaultSaveText = save.innerText;
		save.innerText = '✅ Saved';
		setTimeout(function() {
			save.innerText = defaultSaveText;
		}, 1000);
	});
}

// Update form element states using the preferences stored in chrome.storage.
function initOptions() {
	chrome.storage.sync.get({
		font: true,
		title: chrome.i18n.getMessage("default_title"),
		content: chrome.i18n.getMessage("default_content")
	}, function(items) {
		document.getElementById('font').checked = items.font;
		document.getElementById('title').value = items.title;
		document.getElementById('content').value = items.content;
	});

	document.getElementById('save').addEventListener('click', saveOptions);
}

document.addEventListener('DOMContentLoaded', initOptions);

// save hotkey should save options
document.addEventListener("keydown", function(e) {
	if((e.which == '115' || e.which == '83' ) && (e.ctrlKey || e.metaKey)) {
		e.preventDefault();
		saveOptions();
		return false;
	}
	return true;
});
