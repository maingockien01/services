import { Injectable } from '@nestjs/common';
import { IAuthUser, IAuthorizable, IRole } from '@services/shared/models/auth/interface';
import { Permission } from '@services/shared/models/auth/permission.model';
import { IAuthorizableRepository, IHasRoleRepository } from '../../repositories/auth/interface';
import { AssignRoleInput, AssignRolePayload, AuthorizeInput } from '@services/shared/dtos/auth';

@Injectable()
export class AuthorizeService {
	constructor(
		readonly roleAuthorizableRepository: IAuthorizableRepository<IRole>,
		readonly authUserAuthorizableRepository: IAuthorizableRepository<IAuthUser>,
		readonly hasRoleRepository: IHasRoleRepository<IAuthUser>,
	) {}

	/**
	 *
	 * @param input
	 * @returns JwtPayload
	 * @throws UnauthorizedException
	 */
	async authorizeOrFail(input: AuthorizeInput): Promise<boolean> {
		if (!input.permission) {
			return true;
		}

		let authorizable: IAuthorizable;

		if (input.authenticable.role) {
			authorizable = await this.roleAuthorizableRepository.getAuthorizableOrFail(input.authenticable.role);
		} else if (input.authenticable.email || input.authenticable.username) {
			authorizable = await this.authUserAuthorizableRepository.getAuthorizableOrFail({
				email: input.authenticable.email,
				username: input.authenticable.username,
			});
		} else {
			throw new Error('Invalid input');
		}

		return authorizable.hasPermission(new Permission(input.permission.name));
	}

	/**
	 *
	 *
	 * @throws BadRequestException
	 *
	 * @param input AssignRoleInput
	 */
	async assignRoleOrFail(input: AssignRoleInput): Promise<AssignRolePayload> {
		await this.hasRoleRepository.assignRoleOrFail(
			{
				email: input.authenticable.email,
				username: input.authenticable.username,
			},
			{
				name: input.role.name,
			},
		);

		const hasRole = await this.hasRoleRepository.getHasRoleOrFail({
			email: input.authenticable.email,
			username: input.authenticable.username,
		});

		return {
			role: {
				name: hasRole.role.name,
			},
		};
	}
}
