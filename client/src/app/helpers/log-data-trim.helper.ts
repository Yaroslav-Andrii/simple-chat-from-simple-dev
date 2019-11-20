import { ILoginBody, IRegisterBody } from '../interfaces/auth-body.interface';

export default function dataTrim(data: ILoginBody | IRegisterBody): ILoginBody | IRegisterBody {

    for (let key in data) {
      if (key === 'avatar') continue;

      if (data[key] !== null) {
        data[key] = data[key].trim();
      }
    }
    return data;
}