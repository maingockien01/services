import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Authenticable } from '../../models/auth/authenticable.model';
import { SignInService } from './signin.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from 'config/config.module';
import { ConfigService } from '@nestjs/config';
import { AuthorizeService } from 'services/auth/authorize.service';
import { Role } from 'models/auth/role.model';
import { Permission } from 'models/auth/permission.model';
import { RoleService } from 'services/auth/role.service';

@Module({
	imports: [
		TypeOrmModule.forFeature([Authenticable, Role, Permission]),
		ConfigModule,
		JwtModule.registerAsync({
			inject: [ConfigService],
			useFactory: async (configService: ConfigService) => ({
				secret: configService.get('jwt.secret'),
				signOptions: {
					expiresIn: configService.get('jwt.expiresIn'),
				},
			}),
		}),
	],
	exports: [SignInService, AuthorizeService, RoleService],
})
export class AuthModule {}
