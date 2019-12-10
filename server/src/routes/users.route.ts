import express from 'express';
import Services from '../services';
import Middlewares from '../middlewares';
import IFriend from '../interfaces/friend.interface';

const userRouter = express.Router();

userRouter.get('/',Middlewares.auth, async (req: express.Request, res: express.Response) => {

	const userList: IFriend[] = await Services.chatService.getAllContacts();

	if (req.query.searchString) {

		res.send( 
			userList.filter(user => {
				return user.name.toLowerCase().includes( req.query.searchString.toLowerCase() );
			})
		);

	} else {
		res.send(userList);
	}
	
});

export default userRouter;