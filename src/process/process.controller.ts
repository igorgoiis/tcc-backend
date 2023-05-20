import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProcessService } from './process.service';
import { CreateProcessDto } from './dto/create-process.dto';
import { UpdateProcessDto } from './dto/update-process.dto';
import { CurrentUser } from 'src/common/decorators';
import { User } from 'src/user/entities/user.entity';

@Controller('process')
export class ProcessController {
  constructor(private readonly processService: ProcessService) {}

  @Post()
  create(
    @Body() createProcessDto: CreateProcessDto,
    @CurrentUser() user: User,
  ) {
    return this.processService.create(createProcessDto, user.id);
  }

  @Get()
  findAll(@CurrentUser() user: User) {
    return this.processService.findAll(user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.processService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProcessDto: UpdateProcessDto) {
    return this.processService.update(+id, updateProcessDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.processService.remove(+id);
  }
}
