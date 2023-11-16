import { IJwtPayload } from 'models/jwt/interface';

export class JwtPayload<T> implements IJwtPayload<T> {
	public constructor(
		public readonly sub: number,
		public readonly data: T,
	) {}

	async token(jwtService) {
		return await jwtService.signAsync(this);
	}
}
