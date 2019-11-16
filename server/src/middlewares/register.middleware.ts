import express from 'express';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

import Services from '../services';
import Validators from '../validators';
import { ISafeUser } from '../interfaces/safe-user.interface';

async function registerMiddlewar(req: express.Request, res: express.Response, next: express.NextFunction) {
	try {
		// Validation
		Validators.user.registerValidation(req.body);

		// Checking for uniqueness
		if ( await Services.userService.getUserByEmail(req.body.email) ) {
			throw new Error("User with this email already exists");
		}

		//Hashing password
		const salt = await bcryptjs.genSalt(10);
		req.body.password = await bcryptjs.hash(req.body.password, salt);

		// Creating
		const resultOfCreating: any = await Services.userService.createUser(req.body);

		if (!resultOfCreating) {
			throw new Error("User didn't create");
		}

		// Create and assign a token
		const token = jwt.sign({id: resultOfCreating._id}, <string>process.env.TOKEN_SECRET);

		res.header('access-token', token);

		// Create user data response
		const safeUser: ISafeUser = {
			id: resultOfCreating._id,
			name: resultOfCreating.name,
			avatar: resultOfCreating.avatar,
			friends: resultOfCreating.friends,
			chats: resultOfCreating.chats,
		}

		req.body.userData = safeUser;

		next();
	} catch (error) {
		res.status(400).send(error.message);
	}
}

export default registerMiddlewar;