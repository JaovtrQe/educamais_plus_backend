import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDiaryDto } from './dto/create-diary.dto';

@Injectable()
export class DiaryService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateDiaryDto, userId: string) {
    // valida se o lessonPlan existe e pertence ao usuário
    const lessonPlan = await this.prisma.lessonPlan.findUnique({
      where: { id: dto.lessonPlanId },
    });

    if (!lessonPlan) {
      throw new NotFoundException('Plano de aula não encontrado');
    }

    if (lessonPlan.userId !== userId) {
      throw new NotFoundException('Plano de aula inválido para este usuário');
    }

    return this.prisma.diary.create({
      data: {
        ...dto,
        userId,
      },
    });
  }

  async findAllByUser(userId: string) {
    return this.prisma.diary.findMany({
      where: { userId },
      include: {
        lessonPlan: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findByLessonPlan(lessonPlanId: string) {
    return this.prisma.diary.findFirst({
      where: { lessonPlanId },
      include: {
        lessonPlan: true,
      },
    });
  }
}