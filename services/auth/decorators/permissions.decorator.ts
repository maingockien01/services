import { SetMetadata } from '@nestjs/common';

export const PERMISIONS_KEY = 'permissions';
export const Permissions = (...permissions: string[]) => SetMetadata(PERMISIONS_KEY, permissions);
