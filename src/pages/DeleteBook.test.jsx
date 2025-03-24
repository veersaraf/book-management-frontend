import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom'; // Add Routes and Route
import axios from 'axios';
import { DeleteBook } from './DeleteBook';

jest.mock('axios');

describe('DeleteBook', () => {
    test('deletes book on confirm', async () => {
      axios.delete.mockResolvedValue({});
      render(
        <MemoryRouter initialEntries={['/books/delete/1']}>
          <Routes>
            <Route path="/books/delete/:id" element={<DeleteBook />} />
          </Routes>
        </MemoryRouter>
      );
      fireEvent.click(screen.getByText('Yes, Delete it'));
      await waitFor(() => expect(axios.delete).toHaveBeenCalledWith('http://localhost:5555/books/1'));
    });
  });