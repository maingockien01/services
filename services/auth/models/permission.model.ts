import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IPermission } from './interface';

@Entity({ name: 'permissions' })
export class Permission implements IPermission {
	static fromName(name: string): Permission {
		const [resource, action] = name.split('.');
		return new Permission(resource, action);
	}

	@PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
	id: number;

	@Column({ type: 'string', nullable: false, name: 'resource' })
	resource: string;

	@Column({ type: 'string', nullable: false, name: 'action' })
	action: string;

	constructor(resource: string, action: string) {
		this.resource = resource;
		this.action = action;
	}

	get name(): string {
		return `${this.resource}.${this.action}`;
	}
}
