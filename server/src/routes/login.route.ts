import express from 'express';
import Middlewares from '../middlewares';

const loginRouter = express.Router();

loginRouter.post('/', Middlewares.login, async(req: express.Request, res: express.Response) => {
	res.send({message: 'Wellcome'});
});

export default loginRouter;