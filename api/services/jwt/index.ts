import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtService } from 'services/jwt/jwt.service';

@Module({
	imports: [
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
	exports: [JwtService],
})
export class JwtServicesModule {}
