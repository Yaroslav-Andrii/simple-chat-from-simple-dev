import express from 'express';
import middlewares from '../middlewares';

const chatsRouter = express.Router();

chatsRouter.get('/', middlewares.auth, async(req: express.Request, res: express.Response) => {
	res.send(`sending chats of user by id ${req.body.authInfo.id}`);
});

export default chatsRouter;