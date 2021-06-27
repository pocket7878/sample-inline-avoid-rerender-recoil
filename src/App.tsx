import React from 'react';
import { RecoilRoot } from 'recoil';
import './App.css';
import SingleLoadForms from './SingleLoadForms';
import SeparateLoadForms from './SeparateLoadForms';
import CachedLoadForms from './CachedLoadForms';
import SuspenseLoadForms from './SuspenseLoadForms';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/single">Single</Link>
              </li>
              <li>
                <Link to="/separate">Separate</Link>
              </li>
              <li>
                <Link to="/cached">Cached</Link>
              </li>
              <li>
                <Link to="/suspense">Suspense</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route path="/single">
              <RecoilRoot>
                <SingleLoadForms />
              </RecoilRoot>
            </Route>
            <Route path="/separate">
              <RecoilRoot>
                <SeparateLoadForms />
              </RecoilRoot>
            </Route>
            <Route path="/cached">
              <RecoilRoot>
                <CachedLoadForms />
              </RecoilRoot>
            </Route>
            <Route path="/suspense">
              <RecoilRoot>
                <SuspenseLoadForms />
              </RecoilRoot>
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
