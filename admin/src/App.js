import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css';
import DocList from './components/DocList';
import DashboardAdmin from './pages/DashboardAdmin';
import Login from './pages/Login';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path='/' exact={true} component={Login} />
          <Route path='/adminDashboard' exact={true} component={DashboardAdmin} />
          <Route path='/adminDashboard/docs/:regNo' exact={true} component={DocList} />
        </Switch>
      </Router>
    </div>

  );
}

export default App;