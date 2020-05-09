import React, { useState, useCallback } from 'react';
import debounce from 'lodash/debounce';
import './TypeAhead.css';
// Component will do some kind of caching in Browser.
// The server should cache the apiPrefix also to handle millions of requests per hour.
function TypeAhead({ apiPrefix, name = 'default', label, optionKey }) {
  const onSubmit = () => {
    console.log('Form submitted');
  };
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const debouncedApiCall = useCallback(
    debounce(async value => {
      if (apiPrefix) {
        const response = await (await fetch(`${apiPrefix}${value}`)).json();
        if (response.items && Symbol.iterator in Object(response.items)) setOptions(response.items);
      }
    }, 500),
    [],
  );
  const handleInput = e => {
    setInputValue(e.target.value);
    debouncedApiCall(e.target.value);
  };
  return (
    <div className="TypeAhead">
      <form onSubmit={onSubmit}>
        <label htmlFor={`inputTypeAhead-${name}`}>Search {label ? `for ${label}` : ''}</label>
        <input value={inputValue} type="text" id={`inputTypeAhead-${name}`} autoComplete="off" onChange={handleInput} />
      </form>
      <ul className="suggestions">
        {options.map((option, index) => (
          <li key={index}>{optionKey ? option[optionKey] : option}</li>
        ))}
      </ul>
    </div>
  );
}

export default TypeAhead;
