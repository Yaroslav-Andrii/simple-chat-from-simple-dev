import mongoose from 'mongoose';

import '../models/user.model';
import '../models/chat.model';

export function setUpConnection(): void {
	mongoose.connect(`${process.env.DB_CONNECT}`, { 
		useNewUrlParser: true, 
		useUnifiedTopology: true, 
		useFindAndModify: false
	});
}



 
