import { IRegisterBody, ILoginBody } from '../interfaces/auth-body.interface';

const emailRegExp = /\S+@\S+\.\S+/;
const passwordRegExp = /\S{6,}/;

function signValidator(data: IRegisterBody | ILoginBody): string {

	for (let key in data) {
		if (key === 'avatar') continue;
  
		if (data[key] === null || data[key] === '') {
		  return `Field ${key} is empty`;
		}
	}
	if ( !emailRegExp.test(data.email) ) {
		return `Email or password is not correct`;
	}
  
	if ( !passwordRegExp.test(data.password) ) {
		return `Email or password is not correct`;
	}

	return null;
}

export default signValidator;