import express from 'express';
import Middlewares from '../middlewares';

const registerRouter = express.Router();

registerRouter.post('/', Middlewares.register, async (req: express.Request, res: express.Response) => {
	res.send({message: 'Wellcome'});
});

export default registerRouter;