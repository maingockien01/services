import { Module } from '@nestjs/common';
import { HealthcheckController } from 'rest/healthcheck.controller';

@Module({
	imports: [],
	controllers: [HealthcheckController],
	providers: [],
})
export class RestAPI {}
