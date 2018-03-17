var miniEditLocalstore = miniEditLocalstore || {
	save : function (data) {
		localStorage.setItem(data.id, data.data);
	},
	load : function (id) {
		return localStorage.getItem(id);
	},
};

(function() { 
	miniEdit.setStore(miniEditLocalstore);
})();