import { Authenticable } from 'models/auth/authenticable.model';
import { IAuthenticable } from 'models/auth/interface';

describe('IAuthenticable', () => {
	describe('Authenticable', () => {
		let iauthenticable: IAuthenticable;

		beforeEach(() => {
			iauthenticable = new Authenticable('username', 'email@domain.com', null);
			iauthenticable.plainPassword = 'Test1234!';
		});

		it('should return false when authenticable does not have password', () => {
			expect(iauthenticable.hasPassword('Test1234#')).toBe(false);
		});

		it('should return true when authenticable has correct password', () => {
			expect(iauthenticable.hasPassword('Test1234!')).toBe(true);
		});
	});
});
