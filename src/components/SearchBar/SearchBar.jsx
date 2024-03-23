import { useState } from 'react';
import toast from 'react-hot-toast';
import { FaMagnifyingGlass } from "react-icons/fa6";
import css from './SearchBar.module.css'
const SearchBar = ({ onSubmit }) => {

    const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() === '') {
      toast.error('Enter text to search for images');
      return;
    }
    onSubmit(query);
    setQuery('');
    };
    
  return (
    <header className={css.formBox}>
      <form className={css.form} onSubmit={handleSubmit}>
        <button className={css.button} type="submit"><FaMagnifyingGlass/></button>
        <input 
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>
    </header>
  )
}

export default SearchBar