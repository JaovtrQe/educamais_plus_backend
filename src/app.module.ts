import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module'
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { LearningPathsModule } from './learning-paths/learning-paths.module';
import { ResourcesModule } from './resources/resources.module';
import { LessonPlanModule } from './lesson-plan/lesson-plan.module';
import { DiaryModule } from './diary/diary.module';

@Module({
  imports: [PrismaModule, UserModule, AuthModule, LearningPathsModule, ResourcesModule, LessonPlanModule, DiaryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
