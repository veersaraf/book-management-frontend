import { render, screen } from '@testing-library/react';
import { Spinner } from './Spinner';

describe('Spinner', () => {
  test('renders loading spinner with correct styles', () => {
    render(<Spinner />);
    const spinner = screen.getByRole('status', { hidden: true }); // Assuming role="status" added for accessibility
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass('animate-ping w-16 h-16 m-8 rounded-full bg-sky-600');
  });
});