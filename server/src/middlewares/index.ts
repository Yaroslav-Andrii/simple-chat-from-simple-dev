import authMiddleware from './auth.middleware';
import loginMiddlewar from './login.middleware';
import registerMiddlewar from './register.middleware';
import chatMiddleware from './chat.middleware';

const Middlewares = {
	auth: authMiddleware,
	login: loginMiddlewar,
	register: registerMiddlewar,
	chat: chatMiddleware,
};

export default Middlewares;