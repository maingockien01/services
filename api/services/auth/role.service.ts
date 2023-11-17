import { Injectable } from '@nestjs/common';
import { Role } from '@services/shared/models/auth/role.model';
import { Repository } from 'typeorm';
import { Permission } from '@services/shared/models/auth/permission.model';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RoleService {
	constructor(
		@InjectRepository(Role)
		private readonly roleRepository: Repository<Role>,
		@InjectRepository(Permission)
		private readonly permissionRepository: Repository<Permission>,
	) {}

	async saveRole(roleName: string, permissionName: string[]): Promise<Role> {
		const permissions = permissionName.map((permissionName) => new Permission(permissionName));

		const savedPermissions = await this.permissionRepository.save(permissions);

		const role = new Role(roleName, savedPermissions);

		return await this.roleRepository.save(role);
	}
}
