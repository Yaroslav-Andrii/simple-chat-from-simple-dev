import express from 'express';
import middlewares from '../middlewares';
import Services from '../services'

const chatsRouter = express.Router();

chatsRouter.get('/', middlewares.auth, async(req: express.Request, res: express.Response) => {
	//const result =  await Services.userService.getAll();
	//const result = await Services.userService.clear();

	res.send(`sending chats of user by id ${req.body.authInfo.id}`);
});

export default chatsRouter;