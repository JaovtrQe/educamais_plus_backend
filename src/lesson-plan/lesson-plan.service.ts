import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLessonPlanDto } from './dto/create-lesson-plan.dto';
import { UpdateLessonPlanDto } from './dto/update-lesson-plan.dto';

@Injectable()
export class LessonPlanService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateLessonPlanDto, userId: string) {
    return this.prisma.lessonPlan.create({
      data: {
        ...dto,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  async findAllByUser(userId: string) {
    return this.prisma.lessonPlan.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string, userId: string) {
    const lessonPlan = await this.prisma.lessonPlan.findUnique({
      where: { id },
    });

    if (!lessonPlan) {
      throw new NotFoundException('Plano de aula não encontrado');
    }

    if (lessonPlan.userId !== userId) {
      throw new ForbiddenException('Acesso negado');
    }

    return lessonPlan;
  }

  async update(id: string, dto: UpdateLessonPlanDto, userId: string) {
    const lessonPlan = await this.findOne(id, userId);

    return this.prisma.lessonPlan.update({
      where: { id: lessonPlan.id },
      data: dto,
    });
  }
}