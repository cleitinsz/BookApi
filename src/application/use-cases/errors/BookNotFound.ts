export class BookNotFound extends Error {
  constructor() {
    super('Livro não encontrado.');
  }
}
