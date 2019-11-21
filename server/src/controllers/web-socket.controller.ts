import socketIo from 'socket.io';
import IMessage from '../interfaces/message.interface';
import IChat from '../interfaces/chat.interface';
import Services from '../services';

let buffer: IMessage[] = [];
let currentChat: string;
let currentRoomName: string;

export function connection(socket: socketIo.Socket) {

	socket.on('joinTo', async chatId => {
		try {
			currentChat = chatId;
			currentRoomName = await Services.chatService.getRoomNameById(chatId);

			if (!currentRoomName) throw new Error(`Chat with id ${currentChat} not definded`);

			socket.join(currentRoomName);
		} catch (error) {
			console.error(error.message);
		}
	})

	socket.on('message', (data) => {
		message(data);
		socket.broadcast.to(currentRoomName).emit('incoming', data);
	});
}

function message(data: IMessage, flag: boolean = false) {
	try {
		if (buffer.length >= 100 || flag) {
			Services.chatService.pushMessages(buffer, currentChat);
			console.log(buffer);
			buffer = [];
			console.log(buffer)
			return;
		}
		buffer.push(data);
		return;
	} catch (error) {
		console.error(error.message);
	}
}
