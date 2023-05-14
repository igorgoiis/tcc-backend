import { JwtService } from '@nestjs/jwt';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from 'src/user/repositories/userRepository';
import { SinginDto } from './dto/singin.dto';
import { ISinginReturn } from './interface/singin-return.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async singin(dto: SinginDto) {
    const user = await this.userRepository.findOne({
      where: { email: dto.email },
    });

    if (!user)
      throw new HttpException(
        { message: 'Invalid email or password' },
        HttpStatus.UNAUTHORIZED,
      );

    const token = this.jwtService.sign({
      id: user.id,
      name: user.name,
      email: user.email,
    });

    const response: ISinginReturn = {
      name: user.name,
      email: user.email,
      token,
    };

    return response;
  }

  async refreshUser(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user)
      throw new HttpException(
        {
          message: 'User not found.',
        },
        HttpStatus.UNAUTHORIZED,
      );

    const token = this.jwtService.sign({
      id: user.id,
      name: user.name,
      email: user.email,
    });

    const response: ISinginReturn = {
      name: user.name,
      email: user.email,
      token,
    };

    return response;
  }
}
