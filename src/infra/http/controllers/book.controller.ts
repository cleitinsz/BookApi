import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateBook } from 'src/application/use-cases/create-book';
import { DeleteBook } from 'src/application/use-cases/delete-book';
import { GetBook } from 'src/application/use-cases/get-book';
import { UpdateBook } from 'src/application/use-cases/update-book';
import { BookDTO } from '../dtos/book.dto';
import { booksResponse } from '../responses/BookResponse';
import { BookViewModel } from '../../view-models/book-view-model';
import { Book } from '@prisma/client';

@ApiTags('Livros')
@Controller('book')
export class BookController {
  constructor(
    private createBook: CreateBook,
    private deleteBook: DeleteBook,
    private updateBook: UpdateBook,
    private getBook: GetBook,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Cadastra um livro no banco de dados.' })
  @ApiResponse({ status: 200, schema: { items: booksResponse } })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async create(@Body() body: BookDTO) {
    try {
      const { ...rest } = body;
      const { book } = await this.createBook.execute({
        ...rest,
      });

      return BookViewModel.toHTTP(book);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.PRECONDITION_FAILED,
          error: error.message,
        },
        HttpStatus.PRECONDITION_FAILED,
        {
          cause: error,
        },
      );
    }
  }

  @Get()
  @ApiOperation({ summary: 'Recebe todos os livros.' })
  @ApiResponse({ status: 200, schema: { type: 'array', items: booksResponse } })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async fetchAll() {
    try {
      const { books } = await this.getBook.execute();

      return books.map(BookViewModel.toHTTP);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.PRECONDITION_FAILED,
          error: error.message,
        },
        HttpStatus.PRECONDITION_FAILED,
        {
          cause: error,
        },
      );
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualiza os dados de um livro.' })
  @ApiResponse({ status: 200, description: 'Atualizado' })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async update(@Param('id') id: string, @Body() data: Book) {
    try {
      await this.updateBook.execute({ id, data });
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.PRECONDITION_FAILED,
          error: error.message,
        },
        HttpStatus.PRECONDITION_FAILED,
        {
          cause: error,
        },
      );
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deleta um livro.' })
  @ApiResponse({ status: 200, description: 'Deletado' })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async delete(@Param('id') id: string) {
    try {
      await this.deleteBook.execute({ id });
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.PRECONDITION_FAILED,
          error: error.message,
        },
        HttpStatus.PRECONDITION_FAILED,
        {
          cause: error,
        },
      );
    }
  }
}
