import { useRef } from "react"

interface SearchProps {
  value: string
  handleInput: (val: string) => void
  handleSearch: () => void
}

const Search = ({ value, handleInput, handleSearch }: SearchProps) => {
  const $input = useRef<HTMLInputElement>(null)
  const onInput = () => {
    if ($input.current) {
      handleInput($input.current.value)
    }
  }
  return (
    <div className="search">
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
        <button className="search__btn" onClick={handleSearch}>Search</button>
      </div>
    </div>
  )
}

export default Search
