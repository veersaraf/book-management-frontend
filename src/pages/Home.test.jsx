import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import { Home } from './Home';

jest.mock('axios');

const mockBooks = [
  { _id: '1', title: 'Book One', author: 'Author One', publishYear: 2020 },
];

describe('Home', () => {
  test('shows spinner during loading', async () => {
    axios.get.mockResolvedValueOnce({ data: { data: mockBooks } });
    render(<MemoryRouter><Home /></MemoryRouter>);
    await waitFor(() => expect(screen.getByRole('status')).toBeInTheDocument());
    await waitFor(() => expect(screen.queryByRole('status')).not.toBeInTheDocument());
  });

  test('renders table view by default', async () => {
    axios.get.mockResolvedValueOnce({ data: { data: mockBooks } });
    render(<MemoryRouter><Home /></MemoryRouter>);
    await waitFor(() => expect(screen.getByRole('table')).toBeInTheDocument());
  });

  test('switches to card view on button click', async () => {
    axios.get.mockResolvedValueOnce({ data: { data: mockBooks } });
    render(<MemoryRouter><Home /></MemoryRouter>);
    await waitFor(() => expect(screen.getByRole('table')).toBeInTheDocument());
    fireEvent.click(screen.getByText('Card'));
    const cardContainer = screen.getByTestId('books-card-container');
    expect(within(cardContainer).getByText('Book One')).toBeInTheDocument();
  });

  test('has create book link', async () => {
    axios.get.mockResolvedValueOnce({ data: { data: [] } });
    render(<MemoryRouter><Home /></MemoryRouter>);
    await waitFor(() => {
      const createLink = screen.getByRole('link', { name: /add/i });
      expect(createLink).toHaveAttribute('href', '/books/create');
    });
  });
});

// Helper function to scope queries within a container
function within(element) {
  return {
    getByText: (text) => screen.getByText(text, { container: element }),
  };
}