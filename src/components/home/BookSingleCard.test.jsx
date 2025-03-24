import { render, screen, fireEvent, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { BookSingleCard } from './BookSingleCard';

const mockBook = { _id: '1', title: 'Book One', author: 'Author One', publishYear: 2020 };

describe('BookSingleCard', () => {
  test('opens modal on show button click', () => {
    render(
      <MemoryRouter>
        <BookSingleCard book={mockBook} />
      </MemoryRouter>
    );
    const showButton = screen.getByRole('button', { name: /show book details/i });
    fireEvent.click(showButton);
    const modal = screen.getByTestId('modal-content');
    expect(modal).toBeInTheDocument();
    expect(within(modal).getByText('Book One', { selector: 'h2.my-1' })).toBeInTheDocument();
  });

  test('has correct operation links', () => {
    render(
      <MemoryRouter>
        <BookSingleCard book={mockBook} />
      </MemoryRouter>
    );
    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveAttribute('href', '/books/details/1');
    expect(links[1]).toHaveAttribute('href', '/books/edit/1');
    expect(links[2]).toHaveAttribute('href', '/books/delete/1');
  });
});