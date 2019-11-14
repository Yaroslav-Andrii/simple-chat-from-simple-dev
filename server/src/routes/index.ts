import registerRouter from './register.route';
import loginRouter from './login.route';
import chatsRouter from './chats.route';

const routes = {
	register: registerRouter,
	login: loginRouter,
	chats: chatsRouter
};

export default routes;