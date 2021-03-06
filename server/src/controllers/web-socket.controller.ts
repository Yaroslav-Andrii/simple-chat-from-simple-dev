import socketIo from 'socket.io';
import IMessage from '../interfaces/message.interface';
import Services from '../services';
import ISecureUser from '../interfaces/secure-user.interface';
import IOnlineChat from '../interfaces/online-chat.interface';

const onlineUsers: Map<string, ISecureUser> = new Map();	// KEY = socket.id 
const onlineChats: Map<string, IOnlineChat> = new Map();	// KEY = chatId

export function connection(socket: socketIo.Socket) {

	socket.on('initializeUser', async userId => {

		const user: ISecureUser = await Services.userService.getUserById(userId);
		
		for (let chat of user.chats) {
			await setConnection(socket, user, chat);
		}
		onlineUsers.set(socket.id, user);	
	})

	socket.on('disconnect', _ => {

		const user = onlineUsers.get(socket.id);

		onlineUsers.delete(socket.id);

		for (let onlineChat of onlineChats) {

			onlineChat[1].usersOnline = onlineChat[1].usersOnline.filter(value => user !== value);

			if (onlineChat[1].usersOnline.length < 1) {
				Services.chatService.pushMessages(onlineChat[1].buffer, onlineChat[0]);
				onlineChats.delete(onlineChat[0]);
			}
		}
	})

	socket.on('joinTo', async (chatId: string) => {	
		
		try {
			const user: ISecureUser = <ISecureUser>onlineUsers.get(socket.id);
			if (!user) {
				throw new Error("User not definded")
			}
			await setConnection(socket, user, chatId);
			socket.emit('joined', true);

		} catch (error) {
			console.error(error);
		}
	})

	socket.on('message', (message: IMessage, chatId: string) => {
		try {

			const chat: IOnlineChat = <IOnlineChat>onlineChats.get(chatId);
		
			if (!chat) {
				throw new Error('chat is not defined')
			}
		
			chat.buffer.push(message);		

			if (chat.buffer.length >= 100) {
				Services.chatService.pushMessages(chat.buffer, chatId);
				chat.buffer = [];
			}
			
			socket.broadcast.emit('incoming', message, chatId);

		} catch (error) {
			console.error(error);	
		}
	})
}

async function setConnection(socket: socketIo.Socket, user: ISecureUser, chatId: string): Promise<void> {
	try {

		/**
		 * If user has first time connection to chat
		 * 1. Update user and chat info in database
		 * 2. Refresh user and chat in local info
		 */

		if ( !user.chats.find(chat => chat === chatId) ) {
			// Update user and chat info in database
			await Services.userService.joinChat(chatId, user._id);
			await Services.chatService.joinUser(user._id, chatId);

			// Refresh user data
			const freshUser = await Services.userService.getUserById(user._id);

			onlineUsers.delete(socket.id);
			onlineUsers.set(socket.id, freshUser);

			// If chat initializated Refresh chat data
			if ( onlineChats.has(chatId) ) {
				const freshChat = await Services.chatService.getChatById(chatId);
				const onlienChat: IOnlineChat = <IOnlineChat>onlineChats.get(chatId);

				onlienChat.chat = freshChat;
			}
		}

		if ( onlineChats.has(chatId) ) {

			const onlineChat = onlineChats.get(chatId) as IOnlineChat;
			
			if ( !onlineChat.usersOnline.find(chatUser => chatUser._id === user._id) ) {

				onlineChat.usersOnline.push(user as ISecureUser);
				socket.join(chatId);

				sendBuffer(socket, chatId, onlineChat.buffer);

			} else {
				sendBuffer(socket, chatId, onlineChat.buffer);
			}

		} else {

			onlineChats.set(chatId, {
				buffer: [],
				usersOnline: [ user as ISecureUser ],
				chat: await Services.chatService.getChatById(chatId),
			})

			socket.emit('connected', true);
		}

	} catch (error) {
		console.log(error);
	}
}

function sendBuffer(socket: socketIo.Socket, chatId: string, buffer: IMessage[]): void {
	for (let message of buffer) {
		socket.emit('incoming', message, chatId);
	}
}