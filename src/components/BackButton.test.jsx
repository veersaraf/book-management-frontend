import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { BackButton } from './BackButton';

describe('BackButton', () => {
  test('renders with default destination', () => {
    render(
      <MemoryRouter>
        <BackButton />
      </MemoryRouter>
    );
    const linkElement = screen.getByRole('link');
    expect(linkElement).toHaveAttribute('href', '/');
  });

  test('renders with custom destination', () => {
    render(
      <MemoryRouter>
        <BackButton destination="/custom" />
      </MemoryRouter>
    );
    const linkElement = screen.getByRole('link');
    expect(linkElement).toHaveAttribute('href', '/custom');
  });

  test('contains an arrow icon', () => {
    render(
      <MemoryRouter>
        <BackButton />
      </MemoryRouter>
    );
    const linkElement = screen.getByRole('link');
    const svgElement = linkElement.querySelector('svg');
    expect(svgElement).toBeInTheDocument();
  });
});