import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import { CreateBooks } from './CreateBooks';

jest.mock('axios');

describe('CreateBooks', () => {
  test('creates a new book on save', async () => {
    axios.post.mockResolvedValueOnce({});
    render(<MemoryRouter><CreateBooks /></MemoryRouter>);
    fireEvent.change(screen.getByLabelText('Title'), { target: { value: 'New Book' } });
    fireEvent.change(screen.getByLabelText('Author'), { target: { value: 'New Author' } });
    fireEvent.change(screen.getByLabelText('Publish Year'), { target: { value: '2023' } });
    fireEvent.click(screen.getByText('Save'));
    await waitFor(() => expect(axios.post).toHaveBeenCalledWith(
      'http://localhost:5555/books',
      { title: 'New Book', author: 'New Author', publishYear: '2023' }
    ));
  });

  test('shows spinner during save', async () => {
    axios.post.mockResolvedValueOnce({});
    render(<MemoryRouter><CreateBooks /></MemoryRouter>);
    fireEvent.change(screen.getByLabelText('Title'), { target: { value: 'New Book' } });
    fireEvent.change(screen.getByLabelText('Author'), { target: { value: 'New Author' } });
    fireEvent.change(screen.getByLabelText('Publish Year'), { target: { value: '2023' } });
    fireEvent.click(screen.getByText('Save'));
    expect(screen.getByRole('status')).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByRole('status')).not.toBeInTheDocument());
  });

  test('shows error message on server failure', async () => {
    axios.post.mockRejectedValueOnce(new Error('Server error'));
    render(<MemoryRouter><CreateBooks /></MemoryRouter>);
    fireEvent.change(screen.getByLabelText('Title'), { target: { value: 'New Book' } });
    fireEvent.change(screen.getByLabelText('Author'), { target: { value: 'New Author' } });
    fireEvent.change(screen.getByLabelText('Publish Year'), { target: { value: '2023' } });
    fireEvent.click(screen.getByText('Save'));
    await waitFor(() => expect(screen.getByText('Failed to save book. Please try again.')).toBeInTheDocument());
  });

  test('disables save button with empty title', () => {
    render(<MemoryRouter><CreateBooks /></MemoryRouter>);
    const saveButton = screen.getByText('Save');
    expect(saveButton).toBeDisabled();
  });
});