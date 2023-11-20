import { Book } from '../entities/book';

export abstract class BookRepository {
  abstract createBook(Book: Book): Promise<void>;
  abstract updateBook(id: string, Book: Book): Promise<void>;
  abstract deleteBook(id: string): Promise<void>;
  abstract getBook(): Promise<Book[]>;
}
