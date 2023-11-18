import { Injectable } from '@nestjs/common';
import { IAuthorizableRepository } from './interface';
import { IAuthorizable, IRole } from '@services/shared/models/auth/interface';
import { Role } from '@services/shared/models/auth/role.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RoleAuthorizableRepository implements IAuthorizableRepository<IRole> {
	constructor(
		@InjectRepository(Role)
		readonly roleRepository: Repository<Role>,
	) {}

	async getAuthorizableOrFail(role: IRole): Promise<IAuthorizable> {
		return await this.roleRepository.findOneOrFail({
			where: { name: role.name },
		});
	}
}
