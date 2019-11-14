import authMiddleware from './auth.middleware';
import loginMiddlewar from './login.middleware';
import registerMiddlewar from './register.middleware';

const middlewares = {
	auth: authMiddleware,
	login: loginMiddlewar,
	register: registerMiddlewar,
};

export default middlewares;