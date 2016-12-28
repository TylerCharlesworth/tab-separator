function checkSelection(title) {
	chrome.tabs.query({ active: true, lastFocusedWindow: true }, function(tabs) {
		var title = title || tabs[0].title;
		var defaultslabel = document.getElementsByClassName("defaults-label");
		var i = 0;
		for(; i < defaultslabel.length; i++) {
			if(defaultslabel[i].innerText === title) {
				var selected = document.getElementById(defaultslabel[i].id.replace("-label", ""));
				selected.checked = "checked";
				selected.focus();
				disableCustom(title);
				break;
			}
		}
		if(i === 3) { // no matching title found
			enableCustom(title);
		}
	});
}

function disableCustom(title) {
	document.getElementById("custominput").className = "disabled";
	document.getElementById("custominput").value = title;
}

function enableCustom(title) {
	document.getElementById("custom").checked = "checked";
	var custominput = document.getElementById("custominput");
	custominput.className = "";
	custominput.focus();
	if(title) custominput.value = title;
}

function setTitle(title) {
	chrome.tabs.query({ active: true, lastFocusedWindow: true }, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, title);
	});
}

function updateBlankStatus(state) {
  chrome.storage.sync.set({'blank': state}, function() {});
}

window.addEventListener('load', function () {
	checkSelection();

	chrome.storage.sync.get('blank', function(items) {
    document.getElementById("blank").checked = items['blank']
  });

	document.getElementById("custominput").addEventListener("focus", function() {
		enableCustom();
	});

	document.getElementById("blank").addEventListener("click", function() {
    updateBlankStatus(this.checked);
	});

	document.getElementById("custominput").addEventListener("blur", function() {
		this.value = this.value || document.getElementsByClassName("defaults-label")[0].innerText;
		setTitle(this.value);
		window.setTimeout(function() {
			checkSelection();
		}, 200);
	});

	var defaults = document.getElementsByClassName("defaults");
	var i = 0;
	for(; i < defaults.length; i++) {
		defaults[i].addEventListener("change", function () {
			this.focus();
			var title = document.getElementById(this.id + "-label").innerText;
			setTitle(title);
			disableCustom(title);
		});
	}

	document.getElementById("custominput").addEventListener("keyup", function() {
		setTitle(this.value);
	});

	document.forms[0].addEventListener("submit", function() {
		window.close();
	});

});
