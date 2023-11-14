import { IAuthenticable } from './interface';

export class JwtPayload {
	public readonly authenticable: IAuthenticable;

	public readonly access_token: string;
}
