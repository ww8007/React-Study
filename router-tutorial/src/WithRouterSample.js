import React from 'react';
import { withRouter } from 'react-router-dom';
function WithRouterSample({ location, match, history }) {
  return (
    <div>
      <h4>location</h4>
      <textarea value={JSON.stringify(location, null, 2)}></textarea>
      <h4>match</h4>
      <textarea value={JSON.stringify(match, null, 2)}></textarea>
      <button onClick={() => history.push('/')}>홈으로</button>
    </div>
  );
}

export default withRouter(WithRouterSample);
