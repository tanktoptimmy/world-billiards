import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {
    BrowserRouter as Router,
    Route,
    Switch
  } from 'react-router-dom'

  import App from './components/App/App';
  import NotFound from './components/App/NotFound';
  import Dashboard from './components/Dashboard';
  import Scoreboard from './components/Scoreboard';

  ReactDOM.render((
    <Router>
      <App>
        <Switch>
          <Route exact path="/" component={Dashboard}/>
          <Route exact path="/scoreboard" component={Scoreboard}/>
          <Route component={NotFound}/>
        </Switch>
      </App>
    </Router>
  ), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
