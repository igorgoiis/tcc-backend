import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateProcessDto } from './dto/create-process.dto';
import { UpdateProcessDto } from './dto/update-process.dto';
import { ProcessRepository } from './repositories/ProcessRepository';

@Injectable()
export class ProcessService {
  constructor(private readonly processRepository: ProcessRepository) {}

  logger = new Logger(ProcessService.name);

  async create(dto: CreateProcessDto, user_id: number) {
    try {
      const processFound = await this.processRepository.findOne({
        where: { name: dto.name, user_id },
      });

      if (processFound) {
        throw new HttpException(
          { message: 'This process is already exists.' },
          HttpStatus.NOT_FOUND,
        );
      }

      const processCreated = await this.processRepository.create(dto, user_id);

      return processCreated;
    } catch (error) {
      this.logger.error(`Error creating process: ${error.message}`);

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
          message: 'There was an error creating the process',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(user_id: number) {
    try {
      const processes = await this.processRepository.findAll({
        where: { user_id },
      });

      return processes;
    } catch (error) {
      this.logger.error(`Error fetching processes: ${error.message}`);

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
          message: 'There was an error fetching the processes',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number) {
    try {
      const process = await this.processRepository.findOne({ where: { id } });

      if (!process) {
        throw new HttpException('Process not found.', HttpStatus.NOT_FOUND);
      }

      return process;
    } catch (error) {
      this.logger.error(`Error fetching process: ${error.message}`);

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
          message: 'There was an error fetching the process',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: number, updateProcessDto: UpdateProcessDto) {
    try {
      await this.processRepository.update(id, updateProcessDto);

      return { message: 'Processo atualizado com sucesso!' };
    } catch (error) {
      this.logger.error(`Error updating process: ${error.message}`);

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
          message: 'There was an error updating the process',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number) {
    try {
      await this.processRepository.remove(id);

      return { message: 'Processo excluído com sucesso!' };
    } catch (error) {
      this.logger.error(`Error deleting process: ${error.message}`);

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
          message: 'There was an error deleting the process',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
