import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  UseGuards,
  Req
} from '@nestjs/common'
import { LearningPathService } from './learning-paths.service'
import { CreateLearningPathDto } from './dto/create-learning-path.dto'
import { UpdateProgressDto } from './dto/progress.dto'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'

@Controller('learning-paths')
export class LearningPathController {
  constructor(private service: LearningPathService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateLearningPathDto, @Req() req) {
    return this.service.create(dto, req.user.userId)
  }

  @Get()
  findAll() {
    return this.service.findAll()
  }

  @UseGuards(JwtAuthGuard)
  @Get('with-progress')
  getWithProgress(@Req() req) {
    return this.service.getLearningPathsWithProgress(req.user.userId)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id)
  }

  @UseGuards(JwtAuthGuard)
  @Post('progress')
  updateProgress(@Body() dto: UpdateProgressDto, @Req() req) {
    return this.service.updateProgress(req.user.userId, dto)
  }
}