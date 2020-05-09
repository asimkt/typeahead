import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders Accessible TypeAhead content', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Accessible TypeAhead/i);
  expect(linkElement).toBeInTheDocument();
});
