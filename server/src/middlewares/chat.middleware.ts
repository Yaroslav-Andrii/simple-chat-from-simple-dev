import express from 'express';
import Services from '../services';
import Validators from '../validators';
import IChat from '../interfaces/chat.interface';
import IFriend from '../interfaces/friend.interface';

async function chatMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {

	try {
		const users: IFriend[] = [];

		if (req.body.type && req.body.type === 'public') {

			if (req.body.users) {
				for (let userId of req.body.users) {
	
					const user = await Services.userService.getUserById(userId);
					users.push({
						_id: user._id,
						name: user.name,
					});
				}
			}
		}

		const chatInfo: IChat = {
			name: req.body.name || `${req.body.users[0]}&${req.body.users[0]}`,
			users: users,
			messages: [],
			type: req.body.type,
		}
		
		const { error } = Validators.chat.chatValidator(chatInfo);

		if (error) {
			throw error;
		}
		
		const chat: IChat = await Services.chatService.createChat(chatInfo);

		req.body.chatId = chat._id

		if (req.body.type && req.body.type === 'friend') {
			await Services.userService.joinFriends(<string>chat._id, req.body.users);
		}
		
		next();
		
	} catch (error) {
		res.status(400).send(error.message);
	}
}

export default chatMiddleware;