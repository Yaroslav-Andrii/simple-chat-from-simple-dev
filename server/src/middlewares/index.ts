import authMiddleware from './auth.middleware';
import loginMiddlewar from './login.middleware';
import registerMiddlewar from './register.middleware';

const Middlewares = {
	auth: authMiddleware,
	login: loginMiddlewar,
	register: registerMiddlewar,
};

export default Middlewares;