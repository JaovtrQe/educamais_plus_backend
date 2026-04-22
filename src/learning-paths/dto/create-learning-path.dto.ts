import {
  IsString,
  IsArray,
  ValidateNested,
  IsNumber,
  IsNotEmpty
} from 'class-validator'
import { Type } from 'class-transformer'

class CreateContentDto {
  @IsString()
  @IsNotEmpty()
  title!: string

  @IsString()
  @IsNotEmpty()
  description!: string

  @IsString()
  @IsNotEmpty()
  type!: string

  @IsString()
  @IsNotEmpty()
  url!: string
}

class CreateStepDto {
  @IsString()
  @IsNotEmpty()
  title!: string

  @IsNumber()
  position!: number

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateContentDto)
  resources!: CreateContentDto[]
}

export class CreateLearningPathDto {
  @IsString()
  @IsNotEmpty()
  title!: string

  @IsString()
  @IsNotEmpty()
  description!: string

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateStepDto)
  steps!: CreateStepDto[]
}