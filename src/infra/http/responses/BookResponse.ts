export const booksResponse = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      example: '66f5d652-0666-44df-bbc1-e3b7ba60e2f1',
    },
    title: {
      type: 'string',
      example: 'Antifrágil',
    },
    description: {
      type: 'string',
      example:
        'Antifragile: Things That Gain From Disorder é um livro escrito pelo ensaísta e pesquisador libanês radicado nos Estados Unidos da América, Nassim Nicolas Taleb, cujo original em inglês foi publicado em 2012. Taleb complementa o tema de suas obras anteriores proclamando a incerteza como algo presente e desejável.',
    },
    bar_code: {
      type: 'string',
      example: '09310931092319310',
    },
  },
};
