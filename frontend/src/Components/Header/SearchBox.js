import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchBox() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const submitHandler = (e) => {
    e.preventDefault();
    navigate(query ? `/search/?query=${query}` : '/search');
  };

  return (
    <div>
      <form
        action=""
        className="search-form"
        onSubmit={(e) => submitHandler(e)}
      >
        <input
          type="search"
          name=""
          id="search-box"
          placeholder="tim kiem"
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">
          <label htmlFor="search-box" className="fas fa-search"></label>
        </button>
      </form>
    </div>
  );
}
