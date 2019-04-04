'use strict';

const winston = module.parent.require('winston');
const socketAdmin = require.main.require('./src/socket.io/admin');
const plugin = {
	_res: undefined,
};

const renderEmail = (req, res, next) => {
	if (!req.uid) {
		return next();
	}

	if (req.params.raw === 'raw') {
		res.locals.raw = true;
	}
	plugin._res = res;

	socketAdmin.email.test({ uid: req.uid }, { template: req.params.template }, function () {
		winston.verbose('[email-helper] Rendered email (' + req.params.template + ')');
	});
};

plugin.init = function (params, callback) {
	const router = params.router;

	router.get('/email-helper/:template/:raw?', renderEmail);

	callback();
};

plugin.interceptEmail = function (data, callback) {
	if (plugin._res) {
		if (plugin._res.locals.raw) {
			plugin._res.json(data._raw);
		} else {
			plugin._res.status(200).type('text/html').send(data.html);
		}
		delete plugin._res;
	}
	callback(null, data);
};

module.exports = plugin;
