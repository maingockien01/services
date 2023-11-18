import { IAuthorizable, IHasRole, IRole } from '@services/shared/models/auth/interface';

export interface IAuthorizableRepository<GetAuthorizableInput> {
	getAuthorizableOrFail(input: GetAuthorizableInput): Promise<IAuthorizable>;
}

export interface IHasRoleRepository<AssignRoleInput> {
	assignRoleOrFail(hasRole: AssignRoleInput, role: IRole): Promise<void>;
	removeRoleOrFail(hasRole: AssignRoleInput): Promise<void>;
	hasRoleOrFail(hasRole: AssignRoleInput, role: IRole): Promise<boolean>;
	getHasRoleOrFail(hasRole: AssignRoleInput): Promise<IHasRole>;
}
