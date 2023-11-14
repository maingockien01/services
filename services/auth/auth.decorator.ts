import { UseGuards, applyDecorators } from '@nestjs/common';
import { Permissions } from './decorators/permissions.decorator';
import { AuthenticationGuard } from './guards/authentication.guard';
import { AuthorizationGuard } from './guards/authorization.guard';

export function Auth(...permissions: string[]) {
	return applyDecorators(Permissions(...permissions), UseGuards(AuthenticationGuard, AuthorizationGuard));
}
