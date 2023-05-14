import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SinginDto } from './dto/singin.dto';
import { CurrentUser } from 'src/common/decorators/CurrentUser.decorator';
import { ISinginReturn } from './interface/singin-return.interface';
import { User } from 'src/user/entities/user.entity';
import { IsPublic } from 'src/common/decorators';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @Post()
  async singin(@Body() dto: SinginDto) {
    return this.authService.singin(dto);
  }

  @Get('/refresh-user')
  async refreshUser(@CurrentUser() user: User): Promise<ISinginReturn> {
    return this.authService.refreshUser(user.id);
  }
}
