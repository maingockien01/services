import { NestFactory } from '@nestjs/core';
import { ApiModule } from 'api';

async function bootstrap() {
	const app = await NestFactory.create(ApiModule);
	await app.listen(3000);
}
bootstrap();
