import { Authenticable } from '@services/shared/models/auth/authenticable.model';
import { IAuthorizable } from '@services/shared/models/auth/interface';
import { Permission } from '@services/shared/models/auth/permission.model';
import { Role } from '@services/shared/models/auth/role.model';

describe('IAuthorizable', () => {
	describe('Role', () => {
		let role: IAuthorizable;

		beforeEach(() => {
			role = new Role('role', [new Permission('auth.autherize')]);
		});

		it('should return true when has permission', () => {
			expect(role.hasPermission(new Permission('auth.autherize'))).toBe(true);
		});

		it('should return false when has not permission', () => {
			expect(role.hasPermission(new Permission('auth.autherize2'))).toBe(false);
		});
	});

	describe('Authenticable', () => {
		let iAuthorizable: IAuthorizable;

		beforeEach(() => {
			const authenticable = new Authenticable('username', 'email@domain.com', 'rolename');
			authenticable.role = new Role('rolename', [new Permission('auth.autherize')]);
			iAuthorizable = authenticable;
		});

		it('should return true when has permission', () => {
			expect(iAuthorizable.hasPermission(new Permission('auth.autherize'))).toBe(true);
		});

		it('should return false when has not permission', () => {
			expect(iAuthorizable.hasPermission(new Permission('auth.autherize2'))).toBe(false);
		});
	});
});
