import React, { useState } from 'react';

const SearchBar = () => {
  const [query, setQuery] = useState('');

  //TODO
  // const isURL = (value: string): boolean => {};

  /**
   * When event.target[0].value is URL, open the page
   *
   * When event.target[0].value is query, search query on google
   * @param e React.FormEvent<HTMLFormElement>
   *
   */
  const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    const target = e.target as typeof e.target & {
      '0': { value: string };
    };
    const { value } = target[0];
    // if (isURL(value)) {
    //   e.preventDefault();
    //   chrome.tabs.update({ url: value });
    // }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div className="search-bar w-50 pb-2 d-flex align-items-end">
      <form
        className="w-100 h-75"
        action="http://www.google.com/search"
        method="get"
        onSubmit={onSubmit}>
        {/* Note: GET https://www.google.com/search?q={query} */}
        <input
          className="w-100 h-100 border border-0 rounded-pill px-3"
          type="text"
          onChange={onChange}
          name="q"
          value={query}
          placeholder="search google or type a url"
          style={{ backgroundColor: 'rgb(256, 256, 256, 0.3)' }}
        />
      </form>
    </div>
  );
};

export default SearchBar;
