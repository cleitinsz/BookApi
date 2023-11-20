import { Module } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { BookController } from 'src/infra/http/controllers/book.controller';

@Module({
  controllers: [BookController],
  providers: [PrismaService],
})
export class BookModule {}
