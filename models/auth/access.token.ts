import { JwtService } from '@nestjs/jwt';
import { IAuthUser } from 'models/auth/interface';
import { IJwtPayload, IToJwtPayload } from 'models/jwt/interface';
import { JwtPayload } from 'models/jwt/jwt.payload';

export class AccessToken implements IToJwtPayload<IAuthUser> {
	public readonly value: string;

	constructor(access_token: string) {
		this.value = access_token;
	}

	/**
	 * @inheritdoc
	 *
	 * @param jwtService
	 * @returns
	 */
	toJwtPayload(jwtService: JwtService): IJwtPayload<IAuthUser> {
		const payload = jwtService.verify<JwtPayload<IAuthUser>>(this.value);

		return new JwtPayload<IAuthUser>(payload.sub, payload.data);
	}

	public toString(): string {
		return this.value;
	}
}
