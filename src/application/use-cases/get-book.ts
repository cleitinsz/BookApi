import { Injectable } from '@nestjs/common';
import { BookRepository } from '../repositories/book-repository';
import { BookNotFound } from './errors/BookNotFound';
import { Book } from '../entities/book';

interface GetBookResponse {
  books: Book[];
}
@Injectable()
export class GetBook {
  constructor(private bookRepository: BookRepository) {}

  async execute(): Promise<GetBookResponse> {
    const books = await this.bookRepository.getBook();

    if (!books) {
      throw new BookNotFound();
    }

    return {
      books,
    };
  }
}
