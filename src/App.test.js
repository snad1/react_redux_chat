import { render, screen } from '@testing-library/react';
import App from './App';
import {renderWithProviders} from "./app/util";

test('renders learn react link', () => {
  renderWithProviders(<App />);
  const linkElement = screen.getByText(/Username/i);
  expect(linkElement).toBeInTheDocument();
});
