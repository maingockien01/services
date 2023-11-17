import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IPermission } from './interface';

@Entity({ name: 'permissions' })
export class Permission implements IPermission {
	@PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
	id: number;

	@Column({ type: 'string', nullable: false, name: 'name', unique: true })
	name: string;

	constructor(name: string) {
		this.name = name;
	}
}
