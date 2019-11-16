import express from 'express';
import middlewares from '../middlewares';
import Services from '../services'
import ISafeUser from '../interfaces/safe-user.interface';

const getUserInfoRouter = express.Router();

getUserInfoRouter.get('/', middlewares.auth, async(req: express.Request, res: express.Response) => {
	try {
		const User: ISafeUser = await Services.userService.getUserById(req.body.authInfo.id);
		res.send(User);
	} catch (error) {
		res.status(500).send({message: error.message});
	}
});

export default getUserInfoRouter;