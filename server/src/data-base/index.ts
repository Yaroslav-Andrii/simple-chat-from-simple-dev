import mongoose from 'mongoose';

import * as config from '../etc/config.json';
const db = (<any>config).db;

import '../models/user.model';
import '../models/chat.model';

export function setUpConnection() {
	mongoose.connect(`mongodb://${db.host}:${db.port}/${db.name}`, { useNewUrlParser: true , useUnifiedTopology: true});
}



 
