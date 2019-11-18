import express from 'express';
import Middlewares from '../middlewares';
import Services from '../services'
import IChat from '../interfaces/chat.interface';

const chatsRouter = express.Router();

chatsRouter.get('/', Middlewares.auth, async(req: express.Request, res: express.Response) => {
	const roomsList: IChat[] = await Services.chatService.getAllChats();
	res.send(roomsList);
});

export default chatsRouter;