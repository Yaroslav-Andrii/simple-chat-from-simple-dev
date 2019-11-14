import express from 'express';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

import Services from '../services';
import Validators from '../validators';
import User from '../interfaces/user.interface';

async function loginMiddlewar(req: express.Request, res: express.Response, next: express.NextFunction) {
	try {
		// Validation
		Validators.user.loginValidation(req.body);

		// Checking user
		const dataByEmail: any = await Services.userService.getUserByEmail(req.body.email);

		if (!dataByEmail) {
			throw new Error("Email or login is wrong");
		}

		const user: User = {
			id: dataByEmail._id,
			email: dataByEmail.email,
			password: dataByEmail.password
		}

		// Cheacking passwordS
		const validPasswor = await bcryptjs.compare(req.body.password, user.password);

		if (!validPasswor) {
			throw new Error("Email or login is wrong");
		}

		// Create and assign a token
		const token = jwt.sign({id: user.id}, <string>process.env.TOKEN_SECRET);

		res.header('auth-token', token);

		next();
	} catch (error) {
		res.status(400).send(error.message);
	}
}

export default loginMiddlewar;