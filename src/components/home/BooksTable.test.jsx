import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { BooksTable } from './BooksTable';

const mockBooks = [
  { _id: '1', title: 'Book One', author: 'Author One', publishYear: 2020 },
  { _id: '2', title: 'Book Two', author: 'Author Two', publishYear: 2021 },
];

describe('BooksTable', () => {
  test('renders table with headers and book data', () => {
    render(
      <MemoryRouter>
        <BooksTable books={mockBooks} />
      </MemoryRouter>
    );

    // Check table headers
    const headers = screen.getAllByRole('columnheader');
    expect(headers).toHaveLength(5);
    expect(headers[0]).toHaveTextContent('No');
    expect(headers[1]).toHaveTextContent('Title');
    expect(headers[2]).toHaveTextContent('Author');
    expect(headers[3]).toHaveTextContent('Publish Year');
    expect(headers[4]).toHaveTextContent('Operations');

    // Check rows
    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(3); // 1 header + 2 data rows

    // Check first row
    const firstRowCells = within(rows[1]).getAllByRole('cell');
    expect(firstRowCells[0]).toHaveTextContent('1');
    expect(firstRowCells[1]).toHaveTextContent('Book One');
    expect(firstRowCells[2]).toHaveTextContent('Author One');
    expect(firstRowCells[3]).toHaveTextContent('2020');
    const firstOps = within(firstRowCells[4]).getAllByRole('link');
    expect(firstOps[0]).toHaveAttribute('href', '/books/details/1');
    expect(firstOps[1]).toHaveAttribute('href', '/books/edit/1');
    expect(firstOps[2]).toHaveAttribute('href', '/books/delete/1');
  });
});