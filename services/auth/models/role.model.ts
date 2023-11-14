import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IRole } from './interface';
import { Permission } from './permission.model';

@Entity({ name: 'roles' })
export class Role implements IRole {
	@PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
	id: number;

	@Column({ type: 'string', nullable: false, name: 'name', unique: true })
	name: string;

	@ManyToMany(() => Permission)
	@JoinTable()
	permissions: Permission[];

	constructor(name: string, permissions: Permission[] = []) {
		this.name = name;
		this.permissions = permissions;
	}
}
