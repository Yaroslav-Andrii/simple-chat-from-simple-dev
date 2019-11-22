import socketIo from 'socket.io';
import IMessage from '../interfaces/message.interface';
import IChat from '../interfaces/chat.interface';
import Services from '../services';

let buffer: IMessage[] = [];
let currentChat: string;
let currentRoomName: string;

export function connection(socket: socketIo.Socket) {

	socket.on('joinTo', async (chatId: string) => {
		try {
			if (buffer.length) {
				writeBuffer();
			}

			currentChat = chatId;
			currentRoomName = <string>(await Services.chatService.getRoomNameById(chatId));

			if (!currentRoomName) throw new Error(`Chat with id ${currentChat} not definded`);

			socket.join(currentRoomName);
		} catch (error) {
			console.error(error.message);
		}
	})

	socket.on('message', (data: IMessage) => {
		message(data);
		socket.broadcast.to(currentRoomName).emit('incoming', data);
	});

	socket.on('disconnect', _ => {
		if (buffer.length) {
			writeBuffer();
		}
	})
}

function message(data: IMessage) {
	try {
		if (buffer.length >= 100) writeBuffer();

		buffer.push(data);
		return;
	} catch (error) {
		
	}
}

function writeBuffer(): void {
	try {
		Services.chatService.pushMessages(buffer, currentChat);
		buffer = [];
	} catch (error) {
		console.error(error.message);
	}
}