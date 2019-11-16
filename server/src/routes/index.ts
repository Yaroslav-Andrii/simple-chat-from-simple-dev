import registerRouter from './register.route';
import loginRouter from './login.route';
import chatsRouter from './chats.route';
import getUserInfoRouter from './get-user-info.router';

const routes = {
	register: registerRouter,
	login: loginRouter,
	chats: chatsRouter,
	getUserInfo: getUserInfoRouter,
};

export default routes;