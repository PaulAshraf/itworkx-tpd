import React from 'react';
import 'antd/dist/antd.less';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import ReleaseHome from './pages/ReleaseHome';
import ResourceHome from './pages/ResourceHome';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/releases' exact><ReleaseHome /></Route>
        <Route path='/resources' exact><ResourceHome /></Route>
      </Switch>
    </Router>
  );
}

export default App;
