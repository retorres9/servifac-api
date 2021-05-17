import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { CategoryRepository } from './category.repository';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService],
  imports: [
    TypeOrmModule.forFeature([CategoryRepository])
  ]
})
export class CategoryModule {}
