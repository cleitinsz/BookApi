import { Injectable } from '@nestjs/common';
import { BookRepository } from '../repositories/book-repository';

interface DeleteBookRequest {
  id: string;
}

interface DeleteBookResponse {
  message: string;
}
@Injectable()
export class DeleteBook {
  constructor(private bookRepository: BookRepository) {}

  async execute(request: DeleteBookRequest): Promise<DeleteBookResponse> {
    const { id } = request;

    await this.bookRepository.deleteBook(id);

    return {
      message: `Book deleted successfully`,
    };
  }
}
