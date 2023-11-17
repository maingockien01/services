import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignUpInput, SignUpPayload } from '@services/shared/dtos/auth';
import { Authenticable } from '@services/shared/models/auth/authenticable.model';
import { Repository } from 'typeorm';

@Injectable()
export class SignupService {
	constructor(
		@InjectRepository(Authenticable)
		readonly authenticableRepository: Repository<Authenticable>,
	) {}

	/**
	 *
	 * @param input
	 * @returns JwtPayload
	 * @throws BadRequestException
	 */
	async signupOrFail(input: SignUpInput): Promise<SignUpPayload> {
		const authenticable = new Authenticable(input.authenticable.username, input.authenticable.email, 'normal'); // Always create normal user
		authenticable.plainPassword = input.password;

		return {
			authenticable: await this.authenticableRepository.save(authenticable),
		};
	}
}
