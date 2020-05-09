import React, { useState, useCallback } from 'react';
import debounce from 'lodash/debounce';
import './TypeAhead.css';
// Component will do some kind of caching in Browser.
// The server should cache the apiPrefix also to handle millions of requests per hour.
function TypeAhead({ apiPrefix, name = 'default', onOptionSelect, opts }) {
  const { errorMsg = 'Please select an option', optionKey, label } = opts;
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [active, setActive] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const debouncedApiCall = useCallback(
    debounce(async value => {
      if (apiPrefix) {
        setLoading(true);
        const response = await (await fetch(`${apiPrefix}${value}`)).json();
        setLoading(false);
        if (response.items && Symbol.iterator in Object(response.items)) setOptions(response.items);
      }
    }, 500),
    [],
  );
  const handleInput = e => {
    // Set active as null so that user won't accidently select old value
    setActive(null);
    setInputValue(e.target.value);
    debouncedApiCall(e.target.value);
  };
  const onSubmit = e => {
    e.preventDefault();
    if (!options[0]) {
      setError(errorMsg);
      return;
    }
    applyActiveOption();
    console.log('Form submitted', active);
    // Callback the onOptionSelect prop, so that parent will get the selected output.
    setTimeout(() => typeof onOptionSelect === 'function' && onOptionSelect(active), 0);
  };
  const applyActiveOption = opt => {
    opt = opt || options[0];
    setActive(opt);
    setInputValue(optionKey ? opt[optionKey] : opt);
  };
  return (
    <div className="TypeAhead">
      <form onSubmit={onSubmit}>
        <label htmlFor={`inputTypeAhead-${name}`}>Search {label ? `for ${label}` : ''}</label>
        <input value={inputValue} type="text" id={`inputTypeAhead-${name}`} autoComplete="off" onChange={handleInput} />
        {error ? <p>{errorMsg}</p> : null}
      </form>
      <ul className="suggestions">
        {options.slice(0, 10).map((option, index) => (
          <li
            key={index}
            onMouseOver={() => {
              applyActiveOption(option);
            }}
          >
            {optionKey ? option[optionKey] : option}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TypeAhead;
