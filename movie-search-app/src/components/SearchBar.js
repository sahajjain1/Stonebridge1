import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import useDebounce from '../hooks/useDebounce';

const SearchInput = styled.input`
  margin: 10px;
  padding: 10px 20px; 
  border: none;
  border-radius: 4px;
  font-size: 16px;

  &:focus {
    outline: 2px solid #66afeb;
  }

  &::placeholder {
    color: #999;
  }
  background-color: #f5f5f5;
  background-image: linear-gradient(to right, #f5f5f5 0%, #eee 100%);
`;

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 500);

  React.useEffect(() => {
    if (debouncedQuery) {
      onSearch(debouncedQuery);
    }
  }, [debouncedQuery]);

  const handleInputChange = useCallback((e) => {
    setQuery(e.target.value);
  },[]);

  return (
    <SearchInput
      type="text"
      value={query}
      onChange={handleInputChange}
      placeholder="Search for movies..."
    />
  );
};

export default SearchBar;
//simple genric searchbar component with debounce use use across thhe app