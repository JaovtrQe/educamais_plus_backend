import {
  Controller,
  Post,
  Get,
  Put,
  Param,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';

import { LessonPlanService } from './lesson-plan.service';
import { CreateLessonPlanDto } from './dto/create-lesson-plan.dto';
import { UpdateLessonPlanDto } from './dto/update-lesson-plan.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('lesson-plans')
export class LessonPlanController {
  constructor(private readonly lessonPlanService: LessonPlanService) {}

  @Post()
  create(@Body() dto, @Req() req) {
  console.log(req.user);
  return this.lessonPlanService.create(dto, req.user.id);
}
  @Get()
  findAll(@Req() req) {
    return this.lessonPlanService.findAllByUser(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req) {
    return this.lessonPlanService.findOne(id, req.user.id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateLessonPlanDto,
    @Req() req,
  ) {
    return this.lessonPlanService.update(id, dto, req.user.id);
  }
}