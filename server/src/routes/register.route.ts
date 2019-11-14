import express from 'express';
import middlewares from '../middlewares';

const registerRouter = express.Router();

registerRouter.post('/', middlewares.register, async (req: express.Request, res: express.Response) => {
	res.send(`User created and authorised`);
});

export default registerRouter;