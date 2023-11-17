import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IAuthorizable, IPermission } from './interface';
import { Permission } from './permission.model';

@Entity({ name: 'roles' })
export class Role implements IAuthorizable {
	@PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
	id: number;

	@Column({ type: 'string', nullable: false, name: 'name', unique: true })
	name: string;

	@ManyToMany(() => Permission, { cascade: true })
	@JoinTable({
		name: 'roles_permissions',
		joinColumn: { name: 'role_id', referencedColumnName: 'id' },
		inverseJoinColumn: { name: 'permission_id', referencedColumnName: 'id' },
	})
	permissions: IPermission[];

	constructor(name: string, permissions: Permission[] = []) {
		this.name = name;
		this.permissions = permissions;
	}

	hasPermission(permission: IPermission): boolean {
		return this.permissions.map((permission) => permission.name).includes(permission.name);
	}
}
