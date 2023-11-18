/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface AssignRoleInput {
    authenticable?: Nullable<Authenticable>;
    role?: Nullable<Role>;
}

export interface AuthorizeInput {
    authenticable: Authenticable;
    permission?: Nullable<Permission>;
}

export interface SignInInput {
    authenticable?: Nullable<Authenticable>;
    access_token?: Nullable<string>;
    password?: Nullable<string>;
}

export interface SignUpInput {
    authenticable: Authenticable;
    password: string;
}

export interface MutationPayload {
    success: boolean;
    message?: Nullable<string>;
}

export interface IMutation {
    __typename?: 'IMutation';
    assignRole(input: AssignRoleInput): Nullable<AssignRolePayload> | Promise<Nullable<AssignRolePayload>>;
    signUp(input: SignUpInput): SignUpPayload | Promise<SignUpPayload>;
}

export interface AssignRolePayload {
    __typename?: 'AssignRolePayload';
    authenticable?: Nullable<Authenticable>;
    role?: Nullable<Role>;
}

export interface IQuery {
    __typename?: 'IQuery';
    authorize(input?: Nullable<AuthorizeInput>): boolean | Promise<boolean>;
    signIn(input?: Nullable<SignInInput>): SignInPayload | Promise<SignInPayload>;
}

export interface SignInPayload {
    __typename?: 'SignInPayload';
    access_token: string;
}

export interface SignUpPayload {
    __typename?: 'SignUpPayload';
    authenticable: Authenticable;
}

export interface Authenticable {
    __typename?: 'Authenticable';
    username?: Nullable<string>;
    email?: Nullable<string>;
    role?: Nullable<Role>;
}

export interface Role {
    __typename?: 'Role';
    name: string;
}

export interface Permission {
    __typename?: 'Permission';
    name: string;
}

type Nullable<T> = T | null;
