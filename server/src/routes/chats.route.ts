import express from 'express';
import Middlewares from '../middlewares';
import Services from '../services'
import IChat from '../interfaces/chat.interface';

const chatsRouter = express.Router();

chatsRouter.get('/', Middlewares.auth, async(req: express.Request, res: express.Response) => {
	const roomsList: IChat[] = await Services.chatService.getAllChats();
	res.send( roomsList.filter(room => room.type === 'public') );
});

chatsRouter.get('/:id', Middlewares.auth, async(req: express.Request, res: express.Response) => {
	try {
		const chat = await Services.chatService.getChatById(req.params.id);

		if (!chat) {
			throw new Error('Chat is not definded');
		}

		if (req.query.messages > 0) {
			res.send( chat.messages.slice(-req.query.messages) );
		} else {
			res.send(chat);
		}

	} catch (error) {
		res.status(404).send(error.message);
	}
});

chatsRouter.get('/:id/messages',  Middlewares.auth, async(req: express.Request, res: express.Response) => {
	try {

		const chat = await Services.chatService.getChatById(req.params.id);
		
		if (!chat) {
			throw new Error('Chat is not definded');
		}

		if (req.query.length) {
			res.send( chat.messages.slice(-req.query.length) );
		} else {
			res.send(chat.messages);
		}

	} catch (error) {
		res.status(404).send(error.message);
	}
})

chatsRouter.post('/createNew', Middlewares.auth, Middlewares.chat, async(req: express.Request, res: express.Response) => {
	const newChat = await Services.chatService.getChatById(req.body.chatId);
	res.send(newChat);
});

export default chatsRouter;