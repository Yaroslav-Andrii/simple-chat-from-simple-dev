import express from 'express';
import routes from './routes';

// Get environment data
import dotenv from 'dotenv';
dotenv.config();

// Connect to database
import { setUpConnection } from './data-base';
setUpConnection();

// Start app
const app = express();

// Setting body parsers
app.use( express.json() );
app.use( express.urlencoded({ extended: true }));

// CROS
app.use('/', (req: express.Request, res: express.Response, next: express.NextFunction) => {
	res.header("Access-Control-Allow-Origin", process.env.CLIENT_DOMAIN);
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, auth-token");
	next();
})

// Setting routes
app.use('/register', routes.register);
app.use('/login', routes.login);
app.use('/chats', routes.chats);

// Set listening port 
app.listen(process.env.SERVER_PORT, () => {
	console.log(`Server started on port ${process.env.SERVER_PORT} \n${process.env.API_PREFIX}`);
})