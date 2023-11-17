import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RouterModule } from '@nestjs/core';
import configuration from 'config/configuration';
import { RestAPI } from 'rest';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [configuration],
		}),
		RestAPI,
		RouterModule.register([
			{
				path: 'rest-api',
				module: RestAPI,
			},
		]),
	],
	providers: [],
})
export class ApiModule {}
