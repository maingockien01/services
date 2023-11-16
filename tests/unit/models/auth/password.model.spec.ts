import { HashedPassword, RawPassword } from 'models/auth/password';

describe('Password', () => {
	describe('RawPassword', () => {
		it('should throw an error if the password is less than 8 characters', () => {
			expect(() => {
				RawPassword.fromRaw('test');
			}).toThrow('Password must be at least 8 characters long');
		});

		it('should throw an error if the password is more than 32 characters', () => {
			expect(() => {
				RawPassword.fromRaw('123456781234567812345678123456781');
			}).toThrow('Password must be at most 32 characters long');
		});

		it('should throw an error if the password does not contain an uppercase letter', () => {
			expect(() => {
				RawPassword.fromRaw('test1234');
			}).toThrow('Password must contain at least one uppercase letter');
		});

		it('should throw an error if the password does not contain a lowercase letter', () => {
			expect(() => {
				RawPassword.fromRaw('TEST1234');
			}).toThrow('Password must contain at least one lowercase letter');
		});

		it('should throw an error if the password does not contain a number', () => {
			expect(() => {
				RawPassword.fromRaw('TestTest');
			}).toThrow('Password must contain at least one number');
		});

		it('should throw an error if the password does not contain a special character', () => {
			expect(() => {
				RawPassword.fromRaw('Test1234');
			}).toThrow('Password must contain at least one special character');
		});

		it('should not throw an error if the password matches all the regex', () => {
			expect(() => {
				RawPassword.fromRaw('Test1234!');
			}).not.toThrow();
		});

		it('should generate a salt if not provided', () => {
			const password = RawPassword.fromRaw('Test1234!');
			expect(password.salt).toBeDefined();
		});

		it('should not generate a salt if provided', () => {
			const password = RawPassword.fromRaw('Test1234!', 10);
			expect(password.salt).toBe(10);
		});

		it('should generate a hashed password', () => {
			const password = RawPassword.fromRaw('Test1234!');
			expect(password.hashed).toBeDefined();
		});
	});

	describe('HashedPassword', () => {
		it('should return the hashed password', () => {
			const hashedPassword = new HashedPassword('hashed', 10);
			expect(hashedPassword.hashed).toBe('hashed');
		});

		it('should return the salt', () => {
			const hashedPassword = new HashedPassword('hashed', 10);
			expect(hashedPassword.salt).toBe(10);
		});
	});
});
