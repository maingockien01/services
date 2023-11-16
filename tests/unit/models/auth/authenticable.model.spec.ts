import { Authenticable } from 'models/auth/authenticable.model';

describe('AuthenticableModel', () => {
	it('should throw an error when email is not valid', () => {
		expect(() => {
			const authenticable = new Authenticable('test', 'test', 'test');
			authenticable.email = 'invalid';
		}).toThrow('Email is not valid');
	});
});
