import { Injectable } from '@nestjs/common';
import { BookRepository } from '../repositories/book-repository';
import { Book } from '../entities/book';
import { BookDTO } from 'src/infra/http/dtos/book.dto';

interface UpdateBookRequest {
  id: string;
  data: BookDTO;
}

interface UpdateBookResponse {
  book: Book;
  message: string;
}
@Injectable()
export class UpdateBook {
  constructor(private bookRepository: BookRepository) {}

  async execute(request: UpdateBookRequest): Promise<UpdateBookResponse> {
    const { id, data } = request;

    const book = new Book({
      id: 'odio',
      title: data.title,
      description: data.description,
      bar_code: data.bar_code,
    });

    await this.bookRepository.updateBook(id, book);

    return {
      book,
      message: `Book updated successfully`,
    };
  }
}
