import express from 'express';
import routes from './routes';

// Get environment data
import dotenv from 'dotenv';
dotenv.config();

// Connect to database
import { setUpConnection } from './database';
setUpConnection();

// Start app
const app = express();

// Setting body parsers
app.use( express.json() );
app.use( express.urlencoded({ extended: true }));

// CROS
if (process.argv.includes('cross')) {
	app.use('/', (req: express.Request, res: express.Response, next: express.NextFunction) => {
		res.set({
			"Access-Control-Allow-Origin" : ["*"],
			'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
			'Access-Control-Allow-Headers': 'Content-Type,access-token',
			'Access-Control-Expose-Headers': 'access-token'
		})

		next();
	})
}

// Setting routes
app.use('/register', routes.register);
app.use('/login', routes.login);
app.use('/getUserInfo', routes.getUserInfo)

app.use('/chats', routes.chats);

// Set listening port 
app.listen(process.env.SERVER_PORT, () => {
	console.log(`Server started on port ${process.env.SERVER_PORT} \n${process.env.API_PREFIX}`);
})