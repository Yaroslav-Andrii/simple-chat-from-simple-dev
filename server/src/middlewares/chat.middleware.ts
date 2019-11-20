import express from 'express';
import Services from '../services';
import Validators from '../validators';
import IChat from '../interfaces/chat.interface';

async function chatMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
	try {
		const chatInfo: IChat = {
			name: req.body.name,
			users: req.body.users,
			messages: [],
		}

		const { error } = Validators.chat.chatValidator(chatInfo);

		if (error) {
			throw error;
		}

		const chat: IChat = await Services.chatService.createChat(chatInfo);

		req.body.chatId = chat._id
		
		next();
	} catch (error) {
		res.status(400).send(error.message);
	}
}

export default chatMiddleware;