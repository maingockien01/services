import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Authenticable } from '@services/shared/models/auth/authenticable.model';
import { SignInService } from 'services/auth/signin.service';
import { AuthorizeService } from 'services/auth/authorize.service';
import { Role } from '@services/shared/models/auth/role.model';
import { Permission } from '@services/shared/models/auth/permission.model';
import { RoleService } from 'services/auth/role.service';
import { JwtServicesModule } from 'services/jwt';

@Module({
	imports: [TypeOrmModule.forFeature([Authenticable, Role, Permission]), JwtServicesModule],
	exports: [SignInService, AuthorizeService, RoleService],
})
export class AuthServicesModule {}
