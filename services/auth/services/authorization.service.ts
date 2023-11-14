import { Injectable } from '@nestjs/common';
import { Role } from '../models/role.model';
import { Repository } from 'typeorm';
import { Permission } from 'services/auth/models/permission.model';

@Injectable()
export class AuthorizationService {
	constructor(
		private readonly roleRepository: Repository<Role>,
		private readonly permissionRepository: Repository<Permission>,
	) {}

	async doesRoleHasPermisison(roleName: string, permissionName: string): Promise<boolean> {
		const role = await this.roleRepository.findOne({
			where: { name: roleName },
		});
		if (!role) {
			return false;
		}

		return role.permissions.map((permission) => permission.name).includes(permissionName);
	}

	async savePermission(permissionNames: string[]): Promise<Permission[]> {
		const permissions = permissionNames.map((permissionName) => Permission.fromName(permissionName));

		return await this.permissionRepository.save(permissions);
	}

	async saveRole(roleName: string, permissionNames: string[]): Promise<Role> {
		const permissions = permissionNames.map((permissionName) => Permission.fromName(permissionName));
		const role = new Role(roleName, permissions);

		return await this.roleRepository.save(role);
	}
}
