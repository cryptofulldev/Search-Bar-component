import React from 'react'
import styled from 'styled-components'
import SearchIcon from './SearchIcon'

const SearchBarBox = styled.div`
  background-color: rgb(33, 33, 33);
  border-radius: 10px;
  box-shadow: 0px 20px 25px -20px rgb(81, 214, 255);
  height: 70px;
  max-width: 700px;
  margin: 0 auto;
  padding: 10px 20px 10px 30px;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  gap: 10px;
  &:hover {
    box-shadow: 0px 20px 25px -20px rgb(81, 255, 194);
  }
`
const SearchBarInput = styled.input`
  background: none;
  font-size: 25px;
  font-weight: 500;
  border: none;
  outline: none;
  width: 70%;
  color: rgb(81, 255, 194);
  @media only screen and (max-width: 600px) {
    font-size: 16px;
  }
`
const TipParagraph = styled.p`
  font-size: 10px;
  font-weight: 800;
  margin-top: 30px;
  color: rgb(81, 214, 255);
`
const SearchBarSuggestion = styled.span`
  font-size: 15px;
  font-weight: 600;
  color: rgb(216, 245, 255);
  text-transform: lowercase;
`

const SearchBarIcon = styled.span`
  margin-left: auto;
  svg {
    background-color: rgb(81, 214, 255);
    padding: 17px;
    border-radius: 10px;
    margin-left: 30px;
    cursor: pointer;
    transition: 0.7s ease;
    path {
      fill: black;
    }
  }
  &:hover {
    svg {
      background-color: rgb(81, 255, 194);
    }
  }
`

const SearchBar: React.FC<{
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void
  nextWord: string
  searchValue: string
  selectSug: (correction: boolean, suggestion: string) => void
}> = ({ handleSearch, nextWord, searchValue, selectSug }) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Tab') selectSug(false, nextWord)
  }

  return (
    <>
      {searchValue && (
        <TipParagraph>
          Hit the <span>Tab</span> key to accept suggestion
        </TipParagraph>
      )}
      <SearchBarBox tabIndex={0}>
        <SearchBarInput
          type="text"
          name="search"
          placeholder="Enter search keyword..."
          onChange={handleSearch}
          value={searchValue}
          spellCheck={true}
          onKeyDown={handleKeyDown}
        />
        {searchValue && nextWord && (
          <SearchBarSuggestion>
            <i>{nextWord}</i>
          </SearchBarSuggestion>
        )}
        <SearchBarIcon onClick={() => alert(searchValue)}>
          <SearchIcon />
        </SearchBarIcon>
      </SearchBarBox>
    </>
  )
}

export default SearchBar
