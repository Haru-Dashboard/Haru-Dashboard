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
    <div className="search-bar">
      <form
        action="http://www.google.com/search"
        method="get"
        onSubmit={onSubmit}>
        {/* Note: GET http://www.google.com/search?q={query} */}
        <input type="text" onChange={onChange} name="q" value={query} />
      </form>
    </div>
  );
};

export default SearchBar;
