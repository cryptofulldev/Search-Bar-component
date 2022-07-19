import React from 'react'
import styled from 'styled-components'

const SuggestionBox = styled.div`
  padding: 10px 35px;
  width: 250px;
  background-color: black;
  background-color: rgb(33, 33, 33);
  border-radius: 10px;
`
const SuggestionHeader = styled.h4`
  color: rgb(209, 209, 209);
  font-weight: 900;
`
const SuggestionSug = styled.p`
  padding: 10px 0;
  color: rgb(177, 177, 177);
  border-bottom: 2px solid rgb(58, 58, 58);
  cursor: pointer;
  &:hover {
    color: rgb(81, 214, 255);
  }
`

const Suggestion: React.FC<{ correctionSugs: string[]; searchValue: string; selectSug: (corrections: boolean, item: string) => void }> = ({
  correctionSugs,
  searchValue,
  selectSug,
}) => {
  console.log('[correction Sugs]', correctionSugs)
  return (
    <>
      {searchValue && correctionSugs.length > 1 && (
        <SuggestionBox>
          <SuggestionHeader>Did you mean?</SuggestionHeader>
          {correctionSugs.map((item) => {
            return (
              <SuggestionSug key={item} onClick={() => selectSug(false, item)}>
                {item}
              </SuggestionSug>
            )
          })}
        </SuggestionBox>
      )}
    </>
  )
}

export default Suggestion
