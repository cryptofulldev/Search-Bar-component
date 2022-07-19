import React, { useCallback, useEffect, useState } from 'react'

export const useSearch = () => {
  const [nextWordSug, setNextWordSug] = useState<string>('')
  const [correctionSugs, setCorrectionSugs] = useState<Array<string>>([])
  const [searchValue, setSearchValue] = useState<string>('')
  const [canSearch, setCanSearch] = useState<boolean>(false)

  // Fetch Suggestions
  const getSuggestions = useCallback(async () => {
    const wordArr = searchValue.trim().split(' ')
    console.log('[word]', wordArr)
    const word = wordArr[wordArr.length - 1]
    try {
      const res = await fetch(`https://api.datamuse.com/words?lc=${word}`)
      const data = await res.json()
      if (data.length > 1) setNextWordSug(data[0].word)
    } catch (err) {
      alert('Error occured while getting susggestions!')
    }

    try {
      const res = await fetch(`https://api.datamuse.com/words?sp=${word}`)
      const data = await res.json()
      let _data = []
      for (let i = 0; i < 3; i++) {
        if (data.length >= 3) {
          // if (data[0].word !== word.toLowerCase())
          _data.push(data[i].word)
        }
        setCorrectionSugs(_data)
      }
    } catch (err) {
      alert('Error occured while getting susggestions!')
      console.log(err)
    }
  }, [searchValue])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
    console.log('[handleSearch]', e.target.value, e.target.value.endsWith(' '))
    if (e.target.value.length >= 3) setCanSearch(true)
    else setCanSearch(false)
  }

  const selectSug = (correction: boolean, suggestion: string) => {
    if (correction) {
      let newSearchValue = searchValue.trim().split(' ')
      newSearchValue.pop()
      setSearchValue(newSearchValue + ' ' + correction)
    } else {
      setSearchValue(searchValue + ' ' + suggestion)
    }
  }

  useEffect(() => {
    if (canSearch) {
      getSuggestions()
    }
  }, [canSearch, getSuggestions])

  return { nextWordSug, correctionSugs, searchValue, handleSearch, selectSug }
}
