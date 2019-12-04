import registerRouter from './register.route';
import loginRouter from './login.route';
import chatsRouter from './chats.route';
import getUserInfoRouter from './get-user-info.router';
import usersRouter from './users.route';

const routes = {
	register: registerRouter,
	login: loginRouter,
	chats: chatsRouter,
	getUserInfo: getUserInfoRouter,
	users: usersRouter,
};

export default routes;