import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import { IJwtPayload } from '@services/shared/models/jwt/interface';
import assert from 'assert';
@Injectable()
export class JwtService {
	constructor(private readonly jwtService: NestJwtService) {}

	/**
	 *
	 * @param token
	 * @returns
	 *
	 * @throws {Error} Invalid token when token is null or undefined
	 * @throws {Error} Invalid token when token does not have a sub property
	 * @throws {Error} Invalid token when token does not have a data property
	 *
	 * @postcondition check if the data property has value of type T
	 */
	async getJwtPayloadFromToken<T>(token: string): Promise<IJwtPayload<T>> {
		const payload = await this.jwtService.verifyAsync(token);

		assert(payload, 'Invalid token');
		assert(payload.sub, 'Invalid token');
		assert(payload.data, 'Invalid token');

		return payload as IJwtPayload<T>;
	}

	/**
	 *
	 * @param jwtPayload
	 * @returns
	 */
	generateToken<T>(jwtPayload: IJwtPayload<T>): Promise<string> {
		return this.jwtService.signAsync(jwtPayload);
	}
}
