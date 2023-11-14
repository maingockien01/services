import { RegexGuard } from 'services/common/decorators/regex.guard.decorator';

describe('RegexGuardDecorator', () => {
	class TestClass {
		@RegexGuard(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)
		email: string;

		@RegexGuard(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, 'custom error')
		emailWithCustomError: string;
	}

	it('should be defined', () => {
		expect(RegexGuard).toBeDefined();
	});

	it('should throw an error if the value does not match the regex', () => {
		const testClass = new TestClass();
		expect(() => {
			testClass.email = 'test';
		}).toThrow('Invalid email format');
	});

	it('should throw a custom error if the value does not match the regex', () => {
		const testClass = new TestClass();
		expect(() => {
			testClass.emailWithCustomError = 'test';
		}).toThrow('custom error');
	});

	it('should not throw an error if the value matches the regex', () => {
		const testClass = new TestClass();
		expect(() => {
			testClass.email = 'test@mail.com';
		}).not.toThrow();
	});
});
