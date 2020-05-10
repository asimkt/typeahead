import React from 'react';
import TypeAhead from '../TypeAhead/TypeAhead';

function GithubUserSearch() {
  const opts = {
    optionKey: 'login',
    label: 'Github Users: ',
    errorMsg: 'Please select a github user',
  };
  const showGitHubUser = user => {
    console.log('user', user);
  };
  return (
    <div className="GithubUserSearch">
      {/* TODO: Test with different APIs */}
      <TypeAhead apiPrefix="https://api.github.com/search/users?q=" opts={opts} onOptionSelect={showGitHubUser} />
      <TypeAhead apiPrefix="https://api.github.com/search/users?q=" opts={opts} onOptionSelect={showGitHubUser} />
    </div>
  );
}

export default GithubUserSearch;
