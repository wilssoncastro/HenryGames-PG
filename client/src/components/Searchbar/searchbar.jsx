import React from "react";

export default function SearchBar({name, setName, setPage}) {

  const handleInputChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
    if (e.target.value.length > 2) {
      setPage(0)
    }
  };


  return (
    <div>
      <input
        value={name}
        type="text"
        placeholder="Search Videogames..."
        onChange={(e) => handleInputChange(e)}
        className="searchBarInput"
        // onKeyPress={e => e.key === 'Enter' && handleSubmit(e)}
      />
    </div>
  );
}
