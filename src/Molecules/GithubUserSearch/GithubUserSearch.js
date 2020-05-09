import React from 'react';
import TypeAhead from '../TypeAhead/TypeAhead';

function GithubUserSearch() {
  return (
    <div className="GithubUserSearch">
      <TypeAhead apiPrefix="https://api.github.com/search/users?q=" optionKey="login" label="Github Users: "/>
    </div>
  );
}

export default GithubUserSearch;
