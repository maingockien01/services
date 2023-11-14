import { Authenticable } from 'services/auth/models/authenticable.model';

describe('AuthenticableModel', () => {
	it('should throw an error when email is not valid', () => {
		expect(() => {
			const authenticable = new Authenticable();
			authenticable.email = 'invalid';
		}).toThrow('Email is not valid');
	});
});
