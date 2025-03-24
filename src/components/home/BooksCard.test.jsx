import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { BooksCard } from './BooksCard';

const mockBooks = [
  { _id: '1', title: 'Book One', author: 'Author One', publishYear: 2020 },
  { _id: '2', title: 'Book Two', author: 'Author Two', publishYear: 2021 },
];

describe('BooksCard', () => {
  test('renders correct number of book cards', () => {
    render(
      <MemoryRouter>
        <BooksCard books={mockBooks} />
      </MemoryRouter>
    );
    const cards = screen.getAllByText(/Book (One|Two)/); // Matches titles
    expect(cards).toHaveLength(2);
    expect(screen.getByText('Book One')).toBeInTheDocument();
    expect(screen.getByText('Author One')).toBeInTheDocument();
    expect(screen.getByText('2020')).toBeInTheDocument();
  });
});