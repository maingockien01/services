import { JwtService } from '@nestjs/jwt';

export interface IJwtPayload<T> {
	get sub(): number;
	get data(): T;
	token(jwtService: JwtService): Promise<string>;
}

export interface IToJwtPayload<T> {
	/**
	 *
	 * @param jwtService
	 * @returns
	 *
	 * @throws {BadRequestException} Invalid token
	 */
	toJwtPayload(jwtService: JwtService): IJwtPayload<T>;
}

export interface IHasJwtPayload<T> {
	get jwtPayload(): IJwtPayload<T>;
}
