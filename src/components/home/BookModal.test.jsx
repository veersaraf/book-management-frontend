import { render, screen, fireEvent, within } from '@testing-library/react';
import { BookModal } from './BookModal';

const mockBook = {
  _id: '123',
  title: 'Test Book',
  author: 'Test Author',
  publishYear: 2023,
};

describe('BookModal', () => {
  test('renders book details', () => {
    render(<BookModal book={mockBook} onClose={() => {}} />);
    const modal = screen.getByTestId('modal-content');
    expect(within(modal).getByText('2023')).toBeInTheDocument();
    expect(within(modal).getByText('123')).toBeInTheDocument();
    expect(within(modal).getByText('Test Book', { selector: 'h2.my-1' })).toBeInTheDocument();
    expect(within(modal).getByText('Test Author')).toBeInTheDocument();
    expect(within(modal).getByText('Anything You want to show')).toBeInTheDocument();
  });

  test('calls onClose when close button is clicked', () => {
    const onClose = jest.fn();
    render(<BookModal book={mockBook} onClose={onClose} />);
    const closeButton = screen.getByLabelText('Close modal');
    fireEvent.click(closeButton);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test('calls onClose when clicking overlay', () => {
    const onClose = jest.fn();
    render(<BookModal book={mockBook} onClose={onClose} />);
    const overlay = screen.getByTestId('modal-overlay');
    fireEvent.click(overlay);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test('does not call onClose when clicking inside modal content', () => {
    const onClose = jest.fn();
    render(<BookModal book={mockBook} onClose={onClose} />);
    const content = screen.getByTestId('modal-content');
    fireEvent.click(content);
    expect(onClose).not.toHaveBeenCalled();
  });
});