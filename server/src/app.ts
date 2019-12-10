import express from 'express';
import http from 'http';
import socketIo from 'socket.io';
import routes from './routes';

import {socketController} from './controllers';

// Get environment data
import dotenv from 'dotenv';
dotenv.config();

// Connect to database
import * as database from './database';
import Services from './services';
import IChat from './interfaces/chat.interface';

database.setUpConnection();

// Start app
const app = express();

// Creating server for chating
const server = http.createServer(app);
const io = socketIo(server);

// Web socket connection
io.on('connection', socketController);

// Setting body parsers
app.use( express.json() );
app.use( express.urlencoded({ extended: true }) );

// CORS settings
if ( process.argv.includes('cors') ) {
	app.use('/', (req: express.Request, res: express.Response, next: express.NextFunction) => {

		res.set({
			"Access-Control-Allow-Origin" : '*',
			'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
			'Access-Control-Allow-Headers': 'Content-Type,access-token',
			'Access-Control-Expose-Headers': 'access-token',
		})

		next();
	})
}

// Setting routes
app.use('/register', routes.register);
app.use('/login', routes.login);
app.use('/getUserInfo', routes.getUserInfo)
app.use('/chats', routes.chats);
app.use('/users', routes.users);

/* TMP System routes for development and debugging */
app.get('/clear', async (req: express.Request, res: express.Response) => {

	await Services.chatService.remove();
	await Services.userService.remove();

	res.send('ok');
});

app.get('/check', async (req: express.Request, res: express.Response) => {

	const response = [];

	response.push( await Services.chatService.getAllChats() );
	response.push( await Services.userService.getAll() );

	res.send(response);
});

app.get('/basechat', async (req: express.Request, res: express.Response) => {

	const chat: IChat = {
		name: req.query.name || `Chat ${Math.round(Math.random() * 100)}`,
		users: [],
		messages: [],
		type: 'public',
	}

	await Services.chatService.createChat(chat);
	res.send('ok');
});

// Set listening port 
server.listen(process.env.SERVER_PORT, () => {
	console.log(`Server started on port ${process.env.SERVER_PORT} \n${process.env.API_PREFIX}`);
})