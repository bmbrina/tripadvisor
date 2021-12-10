import { useRef, useState } from "react"

interface SearchProps {
  value: string
  handleInput: (val: string) => void
  handleSearch: () => void
}

const Search = ({ value, handleInput, handleSearch }: SearchProps) => {
  const [hasError, setErrorState] = useState(false)
  const $input = useRef<HTMLInputElement>(null)
  const onInput = () => {
    if ($input.current) {
      setErrorState(false)
      handleInput($input.current.value)
    }
  }
  const handleClick = () => {
    if ($input.current?.value !== '') {
      handleSearch()
    } else {
      setErrorState(true)
    }
  }
  return (
    <div className={`search ${hasError && 'search--error'}`}>
      <label htmlFor="search" className="search__label">Repository url:</label>
      <div className="search__container">
        <input
          className="search__input"
          type="text"
          name="search"
          value={value}
          placeholder="https://github.com/bmbrina/tripadvisor"
          onInput={onInput}
          ref={$input}
        />
        <button className="search__btn" onClick={handleClick}>Search</button>
      </div>
      {hasError && <p className="search__error-message">Please enter a valid repository url</p>}
    </div>
  )
}

export default Search
