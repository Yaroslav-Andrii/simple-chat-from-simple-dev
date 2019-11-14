import express from 'express';
import jwt from 'jsonwebtoken';

async function authMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
	try {
		const token = req.get('auth-token');
		if (!token) throw new Error('Access denied');

		const verified = jwt.verify(token, <string>process.env.TOKEN_SECRET);
		req.body.authInfo = verified;

		next();
	} catch (error) {
		if (error.message === 'Access denied') {
			return res.status(401).send(error.message);
		}
		return res.status(400).send(error.message);
	}
}

export default authMiddleware;