import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ActivityService } from './activity.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';

@Controller('activity')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Post()
  create(@Body() dto: CreateActivityDto) {
    return this.activityService.create(dto);
  }

  @Get('/process/:id')
  findAllByProcess(@Param('id') id: string) {
    return this.activityService.findAllByProcess(+id);
  }

  @Get('/step/:id')
  findAllByStep(@Param('id') id: string) {
    return this.activityService.findAllByStep(+id);
  }

  @Get()
  findAllByName(@Query() query: { name: string }) {
    return this.activityService.findByName(query.name);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateActivityDto: UpdateActivityDto,
  ) {
    return this.activityService.update(+id, updateActivityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.activityService.remove(+id);
  }
}
