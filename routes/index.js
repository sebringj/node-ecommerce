var utils = require('../utils'),
	qs = require('querystring'),
	url = require('url');

module.exports.index = function(req, res) {
	function render() {
		res.render('index', { title: 'Express', products: utils.cache.get('products') });
	}
	
	if (utils.cache.get('products')) {
		render();
	} else {
		utils.getJSON({ 
			host : 'klim.emeraldcode.com', 
			path : '/api/v1/products?tags=shirt' 
		}, function(resultCode, json) {
			utils.cache.set('products', json.products, (1000 * 60 * 5))
			render();
		});
	}
};

module.exports.detail = function(req, res) {
	var cacheKey = req.url;
	
	function render() {
		res.render('detail', { title: utils.cache.get(cacheKey).productName, product: utils.cache.get(cacheKey) });
	}
	
	if (utils.cache.get(cacheKey)) {
		render();
	} else {
		utils.getJSON({ 
			host : 'klim.emeraldcode.com', 
			path : '/api/v1/products?productURL=' + qs.escape(req.url) 
		}, function(resultCode, json) {
			utils.cache.set(cacheKey, json.product, (1000 * 60 * 5))
			render();
		});
	}
};