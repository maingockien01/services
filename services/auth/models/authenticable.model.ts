import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IAuthenticable, IPassword, IRole } from './interface';
import { HashedPassword } from './password.model';
import { Role } from './role.model';
import { RegexGuard } from '../../common/decorators/regex.guard.decorator';

@Entity({ name: 'users' })
export class Authenticable implements IAuthenticable {
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
		nullable: true,
		type: 'string',
		name: 'hashed_password',
	})
	hashedPassword: string;

	@Column({ type: 'int', name: 'salt' })
	salt: number;

	get password(): IPassword {
		return new HashedPassword(this.hashedPassword, this.salt);
	}

	set password(password: IPassword) {
		this.hashedPassword = password.hashed;
		this.salt = password.salt;
	}

	@ManyToOne(() => Role, (role) => role.name)
	role: IRole;

	get roleName(): string {
		return this.role.name;
	}

	set roleName(roleName: string) {
		this.role = new Role(roleName);
	}
}
