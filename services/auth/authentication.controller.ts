import { Controller, Post, Body } from '@nestjs/common';
import { AuthenticationService } from './services/authentication.service';
import { LoginDto } from './dtos/login.dto';

@Controller('auth')
export class AuthenticationController {
	constructor(private readonly authenticationService: AuthenticationService) {}

	@Post('login')
	async signIn(@Body() loginDto: LoginDto) {
		//TODO: username could be email or username
		return await this.authenticationService.signInWithUsername(loginDto.username, loginDto.password);
	}

	@Post('register')
	async register(@Body() loginDto: LoginDto) {
		//TOOD: research about the best way to handle this
	}
}
