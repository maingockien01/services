import { InjectRepository } from '@nestjs/typeorm';
import { Authenticable } from '@services/shared/models/auth/authenticable.model';
import { Role } from '@services/shared/models/auth/role.model';
import { IAuthUser, IHasRole, IRole } from '@services/shared/models/auth/interface';
import { IHasRoleRepository } from './interface';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthUserHasRoleRepository implements IHasRoleRepository<IAuthUser> {
	constructor(
		@InjectRepository(Authenticable)
		readonly authenticableRepository: Repository<Authenticable>,
		@InjectRepository(Role)
		readonly roleRepository: Repository<Role>,
	) {}

	async assignRoleOrFail(authenticable: IAuthUser, role: IRole): Promise<void> {
		const savedRole = await this.roleRepository.findOneOrFail({
			where: [{ name: role.name }],
		});

		const hasRole: IHasRole = await this.authenticableRepository.findOneOrFail({
			where: [{ username: authenticable.username }, { email: authenticable.email }],
		});

		hasRole.role = savedRole;

		await this.authenticableRepository.save(hasRole);
	}

	async removeRoleOrFail(authenticable: IAuthUser): Promise<void> {
		const hasRole: IHasRole = await this.authenticableRepository.findOneOrFail({
			where: [{ username: authenticable.username }, { email: authenticable.email }],
		});

		hasRole.role = null;

		await this.authenticableRepository.save(hasRole);
	}

	async hasRoleOrFail(authenticable: IAuthUser, role: IRole): Promise<boolean> {
		const hasRole: IHasRole = await this.authenticableRepository.findOneOrFail({
			where: [{ username: authenticable.username }, { email: authenticable.email }],
		});

		return hasRole.role?.name === role.name;
	}

	async getHasRoleOrFail(authenticable: IAuthUser): Promise<IHasRole> {
		return await this.authenticableRepository.findOneOrFail({
			where: [{ username: authenticable.username }, { email: authenticable.email }],
		});
	}
}
