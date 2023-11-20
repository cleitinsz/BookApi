import { Module } from '@nestjs/common';
import { BookController } from './controllers/book.controller';
import { CreateBook } from 'src/application/use-cases/create-book';
import { DeleteBook } from 'src/application/use-cases/delete-book';
import { UpdateBook } from 'src/application/use-cases/update-book';
import { GetBook } from 'src/application/use-cases/get-book';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [BookController],
  providers: [CreateBook, DeleteBook, UpdateBook, GetBook],
})
export class HttpModule {}
