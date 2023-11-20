import { Book } from 'src/application/entities/book';

export class PrismaBookMapper {
  static toDomain(book: Book) {
    return {
      id: book.id,
      title: book.title,
      description: book.description,
      bar_code: book.bar_code,
    };
  }

  static toFetchAll(book: Book) {
    return book;
  }
}
