var miniEdit = miniEdit || {
	editor : null,
	currentEditable : null,
	src : null,
	srcParent : null,
	store :null,
	
	editableOndblclick : function () {
		miniEdit.edit(this);
	},
	
	edit : function (sel) {
		miniEdit.currentEditable = sel;
		miniEdit.editor = window.open(miniEdit.srcParent+"miniEditor.html", "miniEditor");
	},
	
	setStore : function (s) {
		miniEdit.store = s;
		document.querySelectorAll(".miniEditEditable").forEach(function(element) {
			var loaded = s.load(element.getAttribute("id"));
			if(loaded != null) {
				element.innerHTML = loaded;
			}
		});
	},
	
	init : function () {
		miniEdit.editor.postMessage(miniEdit.currentEditable.innerHTML, "*");
	},
	preview : function (data) {
		miniEdit.currentEditable.innerHTML = data;
	},
	save : function (data) {
		miniEdit.preview(data);
		miniEdit.store.save({id: miniEdit.currentEditable.getAttribute("id"), data:data});
	},

	receiveMessage : function (e) {
		miniEdit[e.data.cmd](e.data.data);
	}
};

(function() { 
	var scripts = document.getElementsByTagName("script");
	miniEdit.src = scripts[scripts.length-1].src;
	miniEdit.srcParent = miniEdit.src.split('/').slice(0, -1).join('/')+'/';
	window.addEventListener("message", miniEdit.receiveMessage, false);
	if (new URL(location.href).searchParams.get("edit") != null) {
		document.write('<link rel="stylesheet" type="text/css" href="'+miniEdit.srcParent+'miniEdit.css">');
		document.querySelectorAll(".miniEditEditable").forEach(function(element) {
			element.ondblclick = miniEdit.editableOndblclick.bind(element);
		});
	}
})();

