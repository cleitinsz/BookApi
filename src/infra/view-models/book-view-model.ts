import { Book } from 'src/application/entities/book';

export class BookViewModel {
  static toHTTP(book: Book) {
    return {
      id: book.id,
      title: book.title,
      description: book.description,
      bar_code: book.bar_code,
    };
  }
}
