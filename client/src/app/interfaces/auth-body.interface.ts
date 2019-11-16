export interface ILoginBody {
	email: string;
	password: string;
}

export interface IRegisterBody extends ILoginBody{
	name: string;
}
