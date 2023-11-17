import { Controller, Get } from '@nestjs/common';

@Controller('healthcheck')
export class HealthcheckController {
	@Get()
	healthcheck(): string {
		return 'OK';
	}
}
