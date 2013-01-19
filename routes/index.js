var utils = require('../utils'),
	qs = require('querystring'),
	url = require('url');

module.exports.index = function(req, res) {
	function render() {
		res.render('index', { title: 'Express', products: utils.cache.get('products') });
	}
	
	if (utils.cache.get('products')) {
		console.log('products from cache');
		console.log(process.memoryUsage());
		render();
	} else {
		utils.getJSON({ 
			host : 'klim.emeraldcode.com', 
			path : '/api/v1/products?tags=shirt' 
		}, function(resultCode, json) {
			console.log('fetching remote products');
			console.log(process.memoryUsage());
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
		console.log('fetching product from cache');
		console.log(process.memoryUsage());
		render();
	} else {
		utils.getJSON({ 
			host : 'klim.emeraldcode.com', 
			path : '/api/v1/products?productURL=' + qs.escape(req.url) 
		}, function(resultCode, json) {
			console.log('fetching remote product');
			console.log(process.memoryUsage());
			utils.cache.set(cacheKey, json.product, (1000 * 60 * 5))
			render();
		});
	}
};