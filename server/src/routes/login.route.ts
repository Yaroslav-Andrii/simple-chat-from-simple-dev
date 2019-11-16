import express from 'express';
import middlewares from '../middlewares';

const loginRouter = express.Router();

loginRouter.post('/', middlewares.login, async(req: express.Request, res: express.Response) => {
	res.send(req.body.userData);
});

export default loginRouter;