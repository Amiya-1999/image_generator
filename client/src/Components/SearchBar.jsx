import { SearchOutlined } from '@mui/icons-material';
import React from 'react'
import styled from 'styled-components'

const SearchBarContainer = styled.div`
    max-width: 550px;
    width: 90%;
    display: flex;
    border: 1px solid ${({theme}) => theme.text_secondary + 90};
    color: ${({theme}) => theme.text_primary};
    border-radius: 8px;
    padding: 12px 16px;
    cursor: pointer;
    gap: 6px;
    align-items: center;
`;

function SearchBar() {
  return (
    <SearchBarContainer>
        <SearchOutlined />
        <input placeholder='Search with Prompt or Author Name . . .' style={{
            border: 'none',
            outline: 'none',
            width: '100%',
            color: 'inherit',
            background: 'transparent',
            fontSize: '16px'
        }} />
    </SearchBarContainer>
  )
}

export default SearchBar