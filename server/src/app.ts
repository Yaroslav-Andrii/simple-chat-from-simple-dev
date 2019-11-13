import express from 'express';

import Services from './services';
import { setUpConnection } from './data-base';
import * as config from './etc/config.json';

setUpConnection();

const serverPort = (<any>config).serverPort;

const app = express();

app.get('/', async (req, res) => {
	res.send("result");
})

app.listen(serverPort, () => {
	console.log(`Server started on port ${serverPort}`);
})