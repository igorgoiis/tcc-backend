import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const userCreated = this.userRepository.create(createUserDto);

    return this.userRepository.save(userCreated);
  }

  async findAll(options?: FindManyOptions<User>): Promise<User[]> {
    return this.userRepository.find(options);
  }

  async findOne(options: FindOneOptions<User>): Promise<User> {
    return this.userRepository.findOne(options);
  }

  async update(id: number, dto: Partial<User>) {
    const user = await this.findOne({ where: { id } });

    if (!user) {
      throw new HttpException(
        {
          message: 'User not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return this.userRepository.update({ id }, { ...dto });
  }

  async remove(id: number) {
    const user = await this.findOne({ where: { id } });

    if (!user) {
      throw new HttpException(
        {
          message: 'User not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return this.userRepository.delete({ id });
  }
}
