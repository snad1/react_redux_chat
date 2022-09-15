import {fireEvent, screen} from '@testing-library/react';
import App from './App';
import {renderWithProviders} from "./app/util";

test('renders enter username screen', () => {
  renderWithProviders(<App />);
  window.HTMLElement.prototype.scrollIntoView = function() {};

  expect(screen.getByText(/Username/i)).toBeInTheDocument();
});

test('renders chat room screen', () => {
  renderWithProviders(<App />);
  window.HTMLElement.prototype.scrollIntoView = function() {};

  const testUsernameHeader = /Username/i

  expect(screen.getByText(testUsernameHeader)).toBeInTheDocument();

  fireEvent.change(screen.getByTestId('username_input'), {target: {value: 'Test user'}})

  fireEvent.click(screen.getByRole('button', { name: /Enter Chat room/i }))

  expect(screen.queryByText(testUsernameHeader)).toBeNull()

});

test('renders chat room screen and send message', () => {
  renderWithProviders(<App />);
  window.HTMLElement.prototype.scrollIntoView = function() {};

  const testUsernameHeader = /Username/i

  expect(screen.getByText(testUsernameHeader)).toBeInTheDocument();

  fireEvent.change(screen.getByTestId('username_input'), {target: {value: 'Test user'}})

  fireEvent.click(screen.getByRole('button', { name: /Enter Chat room/i }))

  expect(screen.queryByText(testUsernameHeader)).toBeNull()

  fireEvent.change(screen.getByTestId('message_input'), {target: {value: 'Test message'}})

  fireEvent.click(screen.getByRole('button', { name: /Send/i }))

});

test('renders enter chat room screen, send message and check message', () => {
  renderWithProviders(<App />);
  window.HTMLElement.prototype.scrollIntoView = function() {};

  const testUsernameHeader = /Username/i

  expect(screen.getByText(testUsernameHeader)).toBeInTheDocument();

  fireEvent.change(screen.getByTestId('username_input'), {target: {value: 'Test user'}})

  fireEvent.click(screen.getByRole('button', { name: /Enter Chat room/i }))

  expect(screen.queryByText(testUsernameHeader)).toBeNull()

  fireEvent.change(screen.getByTestId('message_input'), {target: {value: 'Test message'}})

  fireEvent.click(screen.getByRole('button', { name: /Send/i }))

  expect(screen.getAllByText(/Test message/i)[0]).toBeInTheDocument();
});
