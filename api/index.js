import { Router } from 'express';
import validateURL from './services/validateurl.js'
import db from './services/db.js';

export default ({ config }) => {
	let api = Router();

	/**
	 * shorten:
	 * 	- first checks if url entered is valid, then pass it on to database service function.
	 */
	api.post('/shorten', (req, res, next) => {
		if(validateURL.isURLValid(req.body.url)){
			db.getShortUrl(req.body.url, config, res);
		} else {
			res.status(200).json({ message: 'URL is not valid!'});
		}
	});

	return api;
}