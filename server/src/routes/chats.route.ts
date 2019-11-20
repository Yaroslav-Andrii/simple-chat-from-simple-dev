import express from 'express';
import Middlewares from '../middlewares';
import Services from '../services'
import IChat from '../interfaces/chat.interface';

const chatsRouter = express.Router();

chatsRouter.get('/', Middlewares.auth, async(req: express.Request, res: express.Response) => {
	const roomsList: IChat[] = await Services.chatService.getAllChats();
	res.send(roomsList);
});

chatsRouter.get('/:id', Middlewares.auth, async(req: express.Request, res: express.Response) => {
	try {
		const chat = await Services.chatService.getChatById(req.params.id);

		if (!chat) {
			throw new Error('Chat is not definded');
		}

		res.send(chat);
	} catch (error) {
		res.status(404).send(error.message);
	}
});

chatsRouter.post('/createNew', Middlewares.auth, Middlewares.chat, async(req: express.Request, res: express.Response) => {
	const newChat = await Services.chatService.getChatById(req.body.chatId);
	res.send(newChat);
});

export default chatsRouter;