import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IAuthUser, IAuthenticable, IAuthorizable, IPassword, IPermission } from './interface';
import { RawPassword } from './password';
import { Role } from './role.model';
import { RegexGuard } from '../../common/decorators/regex.guard.decorator';
import { IHasJwtPayload, IJwtPayload } from 'models/jwt/interface';
import { JwtPayload } from 'models/jwt/jwt.payload';

@Entity({ name: 'users' })
export class Authenticable implements IAuthUser, IAuthenticable, IAuthorizable, IHasJwtPayload<IAuthUser> {
	@PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
	id: number;

	@Column({ type: 'string', nullable: false, name: 'username', unique: true })
	username: string;

	@Column({ nullable: false, type: 'string', unique: true, name: 'email' })
	@RegexGuard(/^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$/, 'Email is not valid')
	email: string;

	@Column({ type: 'int', name: 'create_at' })
	createdAt: number;

	@Column({
		nullable: false,
		type: 'string',
		name: 'hashed_password',
	})
	hashedPassword: string;

	@Column({ type: 'int', name: 'salt' })
	salt: number;

	password: IPassword;

	set plainPassword(plainPassword: string) {
		const rawPassword = RawPassword.fromRaw(plainPassword);
		this.hashedPassword = rawPassword.hashed;
		this.salt = rawPassword.salt;
	}

	@ManyToOne(() => Role, (role) => role.name)
	role: Role;

	get roleName(): string {
		return this.role.name;
	}

	set roleName(roleName: string) {
		this.role = new Role(roleName);
	}

	/**
	 *
	 * @param username
	 * @param email
	 * @param roleName
	 * @param plainPassword
	 *
	 * @throws BadRequestException if email is not valid
	 */
	constructor(username: string, email: string, roleName: string) {
		this.username = username;
		this.email = email;
		this.roleName = roleName;
		this.createdAt = Date.now();
	}

	hasPermission(permission: IPermission): boolean {
		return this.role.hasPermission(permission);
	}

	hasPassword(password: string): boolean {
		const rawPassword = RawPassword.fromRaw(password, this.salt);
		return this.hashedPassword === rawPassword.hashed;
	}

	get jwtPayload(): IJwtPayload<IAuthUser> {
		return new JwtPayload(this.id, this);
	}
}
