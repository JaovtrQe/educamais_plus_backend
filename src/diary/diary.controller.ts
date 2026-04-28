import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';

import { DiaryService } from './diary.service';
import { CreateDiaryDto } from './dto/create-diary.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('diary')
export class DiaryController {
  constructor(private readonly diaryService: DiaryService) {}

  @Post()
  create(@Body() dto: CreateDiaryDto, @Req() req) {
    return this.diaryService.create(dto, req.user.id);
  }

  @Get()
  findAll(@Req() req) {
    return this.diaryService.findAllByUser(req.user.id);
  }

  @Get('lesson-plan/:lessonPlanId')
  findByLessonPlan(@Param('lessonPlanId') lessonPlanId: string) {
    return this.diaryService.findByLessonPlan(lessonPlanId);
  }
}