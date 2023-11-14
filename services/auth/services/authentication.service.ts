import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Authenticable } from '../models/authenticable.model';
import { RawPassword } from '../models/password.model';
import { JwtService } from '@nestjs/jwt';
import { Nullable } from '../../common/types/nullable';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../models/jwtPayload.model';

@Injectable()
export class AuthenticationService {
	constructor(
		readonly authenticableRepository: Repository<Authenticable>,
		readonly jwtService: JwtService,
		readonly configService: ConfigService,
	) {}

	async signInWithUsername(username: string, password: string): Promise<Nullable<JwtPayload>> {
		const authenticable = await this.authenticableRepository.findOne({
			where: { username },
		});
		if (!authenticable) {
			return null;
		}

		const rawPassword = RawPassword.fromRaw(password, authenticable.salt);

		if (rawPassword.hashed !== authenticable.hashedPassword) {
			return null;
		}

		const payload = {
			username: authenticable.username,
			sub: authenticable.id,
		};

		return {
			authenticable,
			access_token: await this.jwtService.signAsync(payload),
		};
	}
}
