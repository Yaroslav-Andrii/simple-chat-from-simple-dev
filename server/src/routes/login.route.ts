import express from 'express';
import middlewares from '../middlewares';

const loginRouter = express.Router();

loginRouter.post('/', middlewares.login, async(req: express.Request, res: express.Response) => {
	res.send('Login');
});

export default loginRouter;