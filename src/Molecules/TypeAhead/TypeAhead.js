import React, { useState } from 'react';
import './TypeAhead.css'
function TypeAhead({url, name = 'default', label, optionKey}) {
  const onSubmit = () => {
      console.log('Form submitted');
  }
  const [options, setOptions] = useState([]);
  return (
    <div className="TypeAhead">
      <form onSubmit={onSubmit}>
          <label htmlFor={`inputTypeAhead-${name}`}>Search {label ? `for ${label}` : ''}</label>
          <input type="text" id={`inputTypeAhead-${name}`} autoComplete="off"/>
      </form>
      <ul className="suggestions">
        {
            options.map(option => <li>{optionKey ? option[optionKey]: option}</li>)
        }
      </ul>
    </div>
  );
}

export default TypeAhead;
