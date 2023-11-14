import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Authenticable } from './models/authenticable.model';
import { AuthenticationService } from './services/authentication.service';
import { AuthenticationController } from './authentication.controller';

@Module({
	imports: [TypeOrmModule.forFeature([Authenticable])],
	controllers: [AuthenticationController],
	providers: [AuthenticationService],
})
export class AuthModule {}
