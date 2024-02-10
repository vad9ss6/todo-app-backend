import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Auth } from './entities/auth.entity';
import { Public } from './auth.guard';
import { ApiTags } from '@nestjs/swagger';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @ApiTags('Auth')
  @Post('login')
  signIn(@Body() signInDto: Auth) {
    return this.authService.signIn(signInDto.user_name, signInDto.password);
  }
}
