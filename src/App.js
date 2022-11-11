import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Infos from './components/Infos';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

function App() {
  return (
    <div className="app">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/carteira" component={ Wallet } />
      </Switch>
      <Infos />
    </div>
  );
}

export default App;
