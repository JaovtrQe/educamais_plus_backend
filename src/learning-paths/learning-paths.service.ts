import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateLearningPathDto } from './dto/create-learning-path.dto'
import { UpdateProgressDto } from './dto/progress.dto'

@Injectable()
export class LearningPathService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateLearningPathDto, userId: string) {
    return this.prisma.learningPath.create({
      data: {
        title: dto.title,
        description: dto.description,

        createdBy: {
          connect: { id: userId }
        },

        steps: {
          create: dto.steps.map(step => ({
            title: step.title,
            position: step.position,

            resources: {
              create: step.resources
            }
          }))
        }
      },
      include: {
        steps: {
          include: {
            resources: true
          }
        }
      }
    })
  }

  async findAll() {
    return this.prisma.learningPath.findMany({
      include: {
        steps: {
          include: {
            resources: true
          }
        }
      }
    })
  }

  async findOne(id: string) {
    return this.prisma.learningPath.findUnique({
      where: { id },
      include: {
        steps: {
          include: {
            resources: true
          }
        }
      }
    })
  }

  async updateProgress(userId: string, dto: UpdateProgressDto) {
    return this.prisma.userProgress.upsert({
      where: {
        userId_stepId: {
          userId,
          stepId: dto.stepId
        }
      },
      update: {
        completed: dto.completed
      },
      create: {
        userId,
        stepId: dto.stepId,
        completed: dto.completed
      }
    })
  }

  async getLearningPathsWithProgress(userId: string) {
    const learningPaths = await this.prisma.learningPath.findMany({
      include: {
        steps: {
          include: {
            progress: true
          }
        }
      }
    })

    return learningPaths.map(path => {
      const totalSteps = path.steps.length

      const completedSteps = path.steps.filter(step =>
        step.progress.some(p => p.completed)
      ).length

      const progress =
        totalSteps === 0
          ? 0
          : Math.round((completedSteps / totalSteps) * 100)

      return {
        id: path.id,
        title: path.title,
        description: path.description,
        progress
      }
    })
  }
}