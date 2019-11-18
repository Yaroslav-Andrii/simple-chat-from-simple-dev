import express from 'express';
import Middlewares from '../middlewares';
import Services from '../services'
import ISecureUser from '../interfaces/secure-user.interface';

const getUserInfoRouter = express.Router();

getUserInfoRouter.get('/', Middlewares.auth, async(req: express.Request, res: express.Response) => {
	try {
		const User: ISecureUser = await Services.userService.getUserById(req.body.authInfo.id);
		res.send(User);
	} catch (error) {
		res.status(500).send({message: error.message});
	}
});

export default getUserInfoRouter;