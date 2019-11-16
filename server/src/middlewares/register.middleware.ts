import express from 'express';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

import Services from '../services';
import Validators from '../validators';
import IUser from '../interfaces/user.interface';

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
		const resultOfCreating: IUser = await Services.userService.createUser(req.body);

		if (!resultOfCreating) {
			throw new Error("User didn't create");
		}

		// Create and assign a token
		const token = jwt.sign({id: resultOfCreating._id}, <string>process.env.TOKEN_SECRET);

		res.header('access-token', token);

		next();
	} catch (error) {
		res.status(400).send(error.message);
	}
}

export default registerMiddlewar;