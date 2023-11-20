import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { BookRepository } from 'src/application/repositories/book-repository';
import { Book } from 'src/application/entities/book';
import { PrismaBookMapper } from '../mappers/prisma-book-mapper';

@Injectable()
export class PrismaBookRepository implements BookRepository {
  constructor(private prisma: PrismaService) {}

  async createBook(data: Book): Promise<void> {
    const raw = PrismaBookMapper.toDomain(data);
    const bookExists = await this.prisma.book.findFirst({
      where: {
        bar_code: data.bar_code,
      },
    });

    if (bookExists) {
      throw new Error(`Book already exists`);
    }
    await this.prisma.book.create({
      data: raw,
    });
  }

  async getBook(): Promise<Book[]> {
    const books = await this.prisma.book.findMany();
    return books.map(PrismaBookMapper.toFetchAll);
  }

  async updateBook(id: string, data: Book): Promise<void> {
    const bookExists = await this.prisma.book.findUnique({
      where: {
        id,
      },
    });

    if (!bookExists) {
      throw new Error('Book does not exists!');
    }

    const raw = PrismaBookMapper.toDomain(data);

    await this.prisma.book.update({
      data: raw,
      where: {
        id,
      },
    });
  }

  async deleteBook(id: string): Promise<void> {
    const bookExists = await this.prisma.book.findUnique({
      where: {
        id,
      },
    });

    if (!bookExists) {
      throw new Error('Book does not exists!');
    }

    await this.prisma.book.delete({
      where: {
        id,
      },
    });
  }
}
