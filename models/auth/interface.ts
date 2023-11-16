export interface IAuthUser {
	get username(): string;

	get email(): string;
}

export interface IAuthenticable {
	hasPassword(plainPassword: string): boolean;

	set plainPassword(plainPassword: string);
}

export interface IAuthorizable {
	hasPermission(permission: IPermission): boolean;
}

export interface IPermission {
	name: string;
}

export interface IPassword {
	get hashed(): string;
	get salt(): number;
}
