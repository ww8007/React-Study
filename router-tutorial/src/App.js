import { Route, Link } from 'react-router-dom';
import About from './About';
import HistorySample from './HistorySample';
import Home from './Home';
import Profiles from './Profiles';
function App() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">홈</Link>
        </li>
        <li>
          <Link to="/about">소개</Link>
        </li>
        <li>
          <Link to="/profiles">프로필 목록</Link>
        </li>
        <li>
          <Link to="/history">예제</Link>
        </li>
      </ul>
      <hr></hr>
      <Route path="/" component={Home} exact />
      <Route path="/about" component={About} />
      <Route path="/profiles" component={Profiles} />
      <Route path="/history" component={HistorySample} />
    </div>
  );
}

export default App;
