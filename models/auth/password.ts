import * as bcrypt from 'bcrypt';
import { RegexGuard } from '../../common/decorators/regex.guard.decorator';
import { assert } from 'console';
import { IPassword } from 'models/auth/interface';

export class RawPassword implements IPassword {
	static fromRaw(raw: string, salt: number = bcrypt.genSaltSync()): RawPassword {
		const rawPassword = new RawPassword();
		rawPassword.raw = raw;
		rawPassword.salt = salt;
		return rawPassword;
	}

	@RegexGuard(/^.{8,}$/, 'Password must be at least 8 characters long')
	@RegexGuard(/^.{8,32}$/, 'Password must be at most 32 characters long')
	@RegexGuard(/^(?=.*[A-Z]).+$/, 'Password must contain at least one uppercase letter')
	@RegexGuard(/^(?=.*\d).+$/, 'Password must contain at least one number')
	@RegexGuard(/^(?=.*[a-z]).+$/, 'Password must contain at least one lowercase letter')
	@RegexGuard(/^(?=.*[!@#$%^&*()\-_=+{};:,<.>]).+$/, 'Password must contain at least one special character')
	raw: string;

	salt: number;

	get hashed(): string {
		assert(this.salt, 'Salt is not defined');

		return bcrypt.hashSync(this.raw, this.salt);
	}
}

export class HashedPassword implements IPassword {
	constructor(
		public readonly hashed: string,
		public readonly salt: number,
	) {}
}
