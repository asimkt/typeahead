import React, { useState, useCallback } from 'react';
import debounce from 'lodash/debounce';
import './TypeAhead.css';
import { getApiResponse } from './utils';
import { Spinner } from '../../Atoms/Spinner/Spinner';
// Component will do some kind of caching in Browser.
// The server should cache the apiPrefix also to handle millions of requests per hour.
function TypeAhead({ apiPrefix, name = 'default', onOptionSelect, opts }) {
  const { errorMsg = 'Please select an option', optionKey, label } = opts;
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [active, setActive] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState('');
  const debouncedApiCall = useCallback(
    debounce(async value => {
      if (apiPrefix) {
        setLoading(true);
        const response = value ? await getApiResponse(`${apiPrefix}${value}`) : {};
        setLoading(false);
        const apiOptions = response.items;
        if (apiOptions && Symbol.iterator in Object(apiOptions)) {
          setOptions(apiOptions);
        }
      }
    }, 500),
    [],
  );
  const handleInput = e => {
    setIsOpen(true);
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
    // Callback the onOptionSelect prop, so that parent will get the selected output.
    if (active) {
      typeof onOptionSelect === 'function' && onOptionSelect(active);
    }
    setIsOpen(false);
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
        <input
          value={inputValue}
          type="text"
          id={`inputTypeAhead-${name}`}
          autoComplete="off"
          onChange={handleInput}
          className="TypeAhead__input"
          role="combobox"
          aria-auto-complete="both"
          aria-owns={`results-${name}`}
          aria-activedescendant={active && (optionKey ? active[optionKey] : active)}
        />
        {error ? <p>{errorMsg}</p> : null}
      </form>
      {isOpen ? (
        <ul className="TypeAhead__options" id={`results-${name}`} role="listbox">
          {isLoading ? (
            <li className="TypeAhead__option">
              <Spinner />
            </li>
          ) : (
            options.slice(0, 10).map((option, index) => (
              <li
                key={index}
                onMouseOver={() => {
                  applyActiveOption(option);
                }}
                onClick={() => {
                  setIsOpen(false);
                }}
                id={optionKey ? option[optionKey] : option}
                className={`TypeAhead__option ${
                  active && option.id === active.id ? 'TypeAhead__option--selected' : ''
                }`}
                role="option"
              >
                {optionKey ? option[optionKey] : option}
              </li>
            ))
          )}
        </ul>
      ) : null}
    </div>
  );
}

export default TypeAhead;
