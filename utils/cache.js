module.exports = (function() {
	var data = {};
	return {
		set : function(key, val, exp) {
			if (data[key] && data[key].timeout) {
				clearTimeout(data[key].timeout);
			}
			data[key] = {val: val, timeout : null};
			if (exp) { 
				data[key].timeout = setTimeout(function() {
					delete data[key];
				},exp);
			}
		},
		get : function(key) {
			if (typeof data[key] === 'undefined') {
				return null;
			}
			return data[key].val;
		}
	};
})();