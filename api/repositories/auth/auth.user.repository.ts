import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Authenticable } from '@services/shared/models/auth/authenticable.model';
import { IAuthUser } from '@services/shared/models/auth/interface';
import { IAuthorizableRepository } from './interface';
import { Repository } from 'typeorm';

@Injectable()
export class AuthUserRepository implements IAuthorizableRepository<IAuthUser> {
	constructor(
		@InjectRepository(Authenticable)
		readonly authenticableRepository: Repository<Authenticable>,
	) {}

	async getAuthorizableOrFail(authenticable: IAuthUser): Promise<Authenticable> {
		return await this.authenticableRepository.findOneOrFail({
			where: [{ username: authenticable.username }, { email: authenticable.email }],
		});
	}
}
