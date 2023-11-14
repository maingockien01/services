import { Injectable } from '@nestjs/common';
import { IAuthenticable } from '../models/interface';
import { RawPassword } from '../models/password.model';
import { Authenticable } from '../models/authenticable.model';
import { Repository } from 'typeorm';

@Injectable()
export class AuthenticableService {
	constructor(private readonly authenticableRepository: Repository<Authenticable>) {}

	async createAuthenticable(authenticable: IAuthenticable, rawPassword: RawPassword): Promise<IAuthenticable> {
		const authenticableModel = new Authenticable();
		authenticableModel.password = rawPassword;
		authenticableModel.username = authenticable.username;
		authenticableModel.email = authenticable.email;
		authenticableModel.roleName = authenticable.roleName ?? 'normal';
		authenticableModel.createdAt = Date.now();

		return await this.authenticableRepository.save(authenticableModel);
	}

	async updateAuthenticableByUsername(username: string, authenticable: IAuthenticable): Promise<IAuthenticable> {
		const authenticableModel = await this.authenticableRepository.findOneOrFail({
			where: [{ username }],
		});

		delete authenticableModel.username;
		authenticableModel.email = authenticable.email;
		authenticableModel.roleName = authenticable.roleName;

		return await this.authenticableRepository.save(authenticableModel);
	}
}
