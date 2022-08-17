import { IRow } from 'components/TwoColumnTable';
import { IAPIAuthor, IAPIBook, IAPIIncluded, IBook, IRelation } from './types';

export const findInIncluded = (
  includedElements: IAPIIncluded[],
  type: string,
  id: string
): IAPIIncluded | undefined =>
  includedElements.find(
    (included) => included.type === type && included.id === id
  );

export const getMappedTableRows = (
  books: IRelation[],
  included: IAPIIncluded[]
): IRow[] => {
  const mappedBooks =
    books?.map((book): IBook => {
      const fullBookInfo = findInIncluded(
        included,
        book.type,
        book.id
      ) as IAPIBook;
      const authorRef = fullBookInfo?.relationships?.author?.data;
      const author = findInIncluded(
        included,
        authorRef.type,
        authorRef.id
      ) as IAPIAuthor;

      return {
        id: fullBookInfo?.id ?? '',
        name: fullBookInfo?.attributes.name,
        copiesSold: fullBookInfo?.attributes.copiesSold,
        author: author.attributes.fullName
      };
    }) ?? [];

  const tableRows: IRow[] = mappedBooks
    .sort((a, b) => b.copiesSold - a.copiesSold)
    .slice(0, 2)
    .map((book) => ({
      id: book.id,
      left: book.name,
      right: book.author
    }));

  return tableRows;
};
