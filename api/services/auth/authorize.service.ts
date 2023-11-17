import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthorizeInput } from '@services/shared/dtos/auth';
import { Authenticable } from '@services/shared/models/auth/authenticable.model';
import { IAuthorizable } from '@services/shared/models/auth/interface';
import { Permission } from '@services/shared/models/auth/permission.model';
import { Role } from '@services/shared/models/auth/role.model';
import { Repository } from 'typeorm';

@Injectable()
export class AuthorizeService {
	constructor(
		@InjectRepository(Authenticable)
		readonly authenticableRepository: Repository<Authenticable>,
		@InjectRepository(Role)
		readonly roleRepository: Repository<Role>,
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

		let authentizable: IAuthorizable;

		if (input.authenticable.role) {
			try {
				authentizable = await this.roleRepository.findOneOrFail({
					where: { name: input.authenticable.role.name },
				});
			} catch {
				throw new UnauthorizedException('Invalid authorization');
			}
		} else if (input.authenticable.email || input.authenticable.username) {
			try {
				authentizable = await this.authenticableRepository.findOneOrFail({
					where: [{ username: input.authenticable.username }, { email: input.authenticable.email }],
				});
			} catch {
				throw new UnauthorizedException('Invalid authorization');
			}
		} else {
			throw new Error();
		}

		return authentizable.hasPermission(new Permission(input.permission.name));
	}

	/**
	 *
	 * @param username
	 * @param roleName
	 *
	 * @throws BadRequestException
	 *
	 */
	async assignRoleOrFail(username: string, roleName: string): Promise<void> {
		const authenticable = await this.authenticableRepository.findOneOrFail({
			where: [{ username }],
		});

		const role = await this.roleRepository.findOneOrFail({
			where: [{ name: roleName }],
		});

		authenticable.role = role;

		await this.authenticableRepository.save(authenticable);
	}
}
