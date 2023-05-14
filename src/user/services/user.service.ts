import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserRepository } from '../repositories/userRepository';
import { createHash } from 'crypto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  logger = new Logger(UserService.name);

  async create(dto: CreateUserDto) {
    try {
      const passwordToMd5 = createHash('md5')
        .update(dto.password)
        .digest('hex');

      const user = await this.userRepository.create({
        ...dto,
        password: passwordToMd5,
      });

      return user;
    } catch (error) {
      this.logger.error(`Error creating user: ${error.message}`);

      if (error instanceof HttpException) {
        throw new HttpException(
          {
            message: error.message,
          },
          error.getStatus(),
        );
      }

      throw new HttpException(
        {
          message: 'There was an error creating the user',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    try {
      const users = await this.userRepository.findAll({
        select: ['id', 'email', 'name', 'created_at', 'updated_at'],
      });

      return users;
    } catch (error) {
      this.logger.error(`Error fetching users: ${error.message}`);

      if (error instanceof HttpException) {
        throw new HttpException(
          {
            message: error.message,
          },
          error.getStatus(),
        );
      }

      throw new HttpException(
        {
          message: 'There was an error fetching the users',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.userRepository.findOne({
        select: ['id', 'email', 'name', 'created_at', 'updated_at'],
        where: { id },
      });

      return user;
    } catch (error) {
      this.logger.error(`Error fetching user: ${error.message}`);

      if (error instanceof HttpException) {
        throw new HttpException(
          {
            message: error.message,
          },
          error.getStatus(),
        );
      }

      throw new HttpException(
        {
          message: 'There was an error fetching the user',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: number, dto: UpdateUserDto) {
    try {
      await this.userRepository.update(id, dto);

      return { message: 'User updated successfully' };
    } catch (error) {
      this.logger.error(`Error updating user: ${error.message}`);

      if (error instanceof HttpException) {
        throw new HttpException(
          {
            message: error.message,
          },
          error.getStatus(),
        );
      }

      throw new HttpException(
        {
          message: 'There was an error updating the user',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number) {
    try {
      await this.userRepository.remove(id);

      return { message: 'User removed successfully' };
    } catch (error) {
      this.logger.error(`Error removing user: ${error.message}`);

      if (error instanceof HttpException) {
        throw new HttpException(
          {
            message: error.message,
          },
          error.getStatus(),
        );
      }

      throw new HttpException(
        {
          message: 'There was an error removing the user',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
