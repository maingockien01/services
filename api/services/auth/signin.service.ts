import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { SignInInput, SignInPayload } from '@services/shared/dtos/auth';
import { InjectRepository } from '@nestjs/typeorm';
import { Authenticable } from '@services/shared/models/auth/authenticable.model';
import { IHasJwtPayload } from '@services/shared/models/jwt/interface';
import { IAuthUser, IAuthenticable } from '@services/shared/models/auth/interface';
import { JwtService } from 'services/jwt/jwt.service';

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
		let authenticable: IAuthenticable & IHasJwtPayload<IAuthUser>;

		if (input.access_token) {
			try {
				const inputPayload = await this.jwtService.getJwtPayloadFromToken<IAuthUser>(input.access_token);

				authenticable = await this.authenticableRepository.findOneOrFail({
					where: [{ username: inputPayload.data.username }, { email: inputPayload.data.email }],
				});
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
		} else {
			throw new BadRequestException('Invalid input');
		}

		const payload = authenticable.jwtPayload;
		const access_token = await this.jwtService.generateToken(payload);
		return {
			access_token,
		};
	}
}
