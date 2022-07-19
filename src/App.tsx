import React from 'react'
import styled from 'styled-components'
import './App.css'
import SearchBar from './components/SearchBar'
import Suggestion from './components/Suggestion'
import { useSearch } from './hooks/useSearch'

const AppHeader = styled.h1`
  background: -webkit-linear-gradient(315deg, #42d392 25%, #647eff);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 50px;
  margin: 100px 0 50px 0;
  @media only screen and (max-width: 600px) {
    text-align: center;
    font-size: 35px;
  }
`

const App: React.FC = () => {
  const { nextWordSug, searchValue, handleSearch, selectSug, correctionSugs } = useSearch()
  return (
    <div className="App">
      <AppHeader>Typo Friendly Search Demo </AppHeader>
      <SearchBar handleSearch={handleSearch} nextWord={nextWordSug} searchValue={searchValue} selectSug={selectSug} />
      <Suggestion correctionSugs={correctionSugs} searchValue={searchValue} selectSug={selectSug} />
    </div>
  )
}

export default App
