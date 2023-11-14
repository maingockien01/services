export interface IAuthenticable {
	username: string;

	email: string;

	roleName: string;
}

export interface IPermission {
	name: string;
}

export interface IRole {
	name: string;

	permissions: IPermission[];
}

export interface IPassword {
	hashed: string;
	salt: number;
}
