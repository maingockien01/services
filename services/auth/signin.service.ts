import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { SignInInput, SignInPayload } from 'dtos/auth';
import { InjectRepository } from '@nestjs/typeorm';
import { Authenticable } from 'models/auth/authenticable.model';
import { JwtService } from '@nestjs/jwt';
import { AccessToken } from 'models/auth/access.token';
import { IHasJwtPayload, IJwtPayload } from 'models/jwt/interface';
import { IAuthUser, IAuthenticable } from 'models/auth/interface';

@Injectable()
export class SignInService {
	constructor(
		@InjectRepository(Authenticable)
		readonly authenticableRepository: Repository<Authenticable>,
		readonly jwtService: JwtService,
	) {}

	/**
	 *
	 * @param input
	 * @returns JwtPayload
	 * @throws UnauthorizedException
	 * @throws BadRequestException
	 */
	async signInOrFail(input: SignInInput): Promise<SignInPayload> {
		let payload: IJwtPayload<IAuthUser>;
		let authenticable: IAuthenticable & IHasJwtPayload<IAuthUser>;

		if (input.access_token) {
			try {
				const accessToken = new AccessToken(input.access_token);
				payload = accessToken.toJwtPayload(this.jwtService);
			} catch {
				throw new UnauthorizedException('Invalid token');
			}
		} else if (input.authenticable && input.password) {
			authenticable = await this.authenticableRepository.findOneOrFail({
				where: [{ username: input.authenticable.username }, { email: input.authenticable.email }],
			});

			if (!authenticable || !authenticable.hasPassword(input.password)) {
				throw new UnauthorizedException('Invalid credentials');
			}

			payload = authenticable.jwtPayload;
		} else {
			throw new BadRequestException('Invalid input');
		}

		const access_token = await payload.token(this.jwtService);
		return {
			access_token,
		};
	}
}
