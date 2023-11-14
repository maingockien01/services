import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import { JwtPayload } from '../models/jwtPayload.model';

@Injectable()
export class JwtService {
	constructor(
		private readonly jwtService: NestJwtService,
		private readonly configService: ConfigService,
	) {}

	async getPayloadFromToken(token: string): Promise<JwtPayload> {
		const payload = await this.jwtService.verifyAsync(token, {
			secret: this.configService.get('jwt.secret'),
		});

		return payload as JwtPayload;
	}

	async refreshJwtToken(token: string): Promise<JwtPayload> {
		//TODO: Implement this method
		throw new Error('Not implemented' + token);
	}
}
