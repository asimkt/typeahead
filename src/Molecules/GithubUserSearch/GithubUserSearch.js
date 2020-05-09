import React from 'react';
import TypeAhead from '../TypeAhead/TypeAhead';

function GithubUserSearch() {
  const opts = {
    optionKey: 'login',
    label: 'Github Users: ',
    errorMsg: 'Please select a github user',
  };
  return (
    <div className="GithubUserSearch">
      <TypeAhead apiPrefix="https://api.github.com/search/users?q=" opts={opts} />
    </div>
  );
}

export default GithubUserSearch;
