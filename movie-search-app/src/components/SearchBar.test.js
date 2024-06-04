import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import SearchBar from '../components/SearchBar';

test('renders SearchBar and triggers onSearch', async () => {
  const handleSearch = jest.fn();
  render(<SearchBar onSearch={handleSearch} />);

  const input = screen.getByPlaceholderText('Search for movies...');
  fireEvent.change(input, { target: { value: 'Batman' } });

  await act(async () => {
    await new Promise(resolve => setTimeout(resolve, 600)); 
  });

  expect(handleSearch).toHaveBeenCalledWith('Batman');
});

///coulld add test cases for other component but it gonna take much time