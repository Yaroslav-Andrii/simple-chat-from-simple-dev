import express from 'express';
import Services from '../services';
import Middlewares from '../middlewares';
import IFriend from '../interfaces/friend.interface';

const contactRouter = express.Router();

contactRouter.get('/',Middlewares.auth, async (req: express.Request, res: express.Response) => {
	const userList: IFriend[] = await Services.chatService.getAllContacts();
	res.send(userList);
});

export default contactRouter;