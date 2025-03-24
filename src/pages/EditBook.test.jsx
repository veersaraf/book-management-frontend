import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { EditBook } from './EditBook';

jest.mock('axios');

const mockBook = {
  title: 'Book One',
  author: 'Author One',
  publishYear: 2020,
};

test('updates book on save', async () => {
  axios.get.mockResolvedValueOnce({ data: mockBook });
  axios.put.mockResolvedValueOnce({});
  render(
    <MemoryRouter initialEntries={['/books/edit/1']}>
      <Routes>
        <Route path="/books/edit/:id" element={<EditBook />} />
        <Route path="*" element={<div />} /> {/* Catch-all route */}
      </Routes>
    </MemoryRouter>
  );
  await waitFor(() => screen.getByDisplayValue('Book One'));
  fireEvent.change(screen.getByLabelText('Title'), {
    target: { value: 'Updated Book' },
  });
  fireEvent.click(screen.getByText('Save'));
  await waitFor(() =>
    expect(axios.put).toHaveBeenCalledWith('http://localhost:5555/books/1', {
      title: 'Updated Book',
      author: 'Author One',
      publishYear: 2020,
    })
  );
});

test('shows error when failing to load book details', async () => {
  axios.get.mockRejectedValueOnce(new Error('Failed to load'));
  render(
    <MemoryRouter initialEntries={['/books/edit/1']}>
      <Routes>
        <Route path="/books/edit/:id" element={<EditBook />} />
        <Route path="*" element={<div />} /> {/* Catch-all route */}
      </Routes>
    </MemoryRouter>
  );
  await waitFor(() => {
    expect(
      screen.getByText('Failed to load book details. Please try again.')
    ).toBeInTheDocument();
  });
});