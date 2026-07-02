import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the landing page', () => {
  render(<App />);
  expect(screen.getByText(/pomodoro timer/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /get started/i })).toBeInTheDocument();
});
