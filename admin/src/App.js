import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Student from './pages/Student';
import './App.css';
import DocList from './components/DocList';
import DashboardAdmin from './pages/DashboardAdmin';
import Login from './pages/Login';
import AdmitCard from './components/AdmitCard';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path='/' exact={true} component={Login} />
          <Route path='/adminDashboard' exact={true} component={DashboardAdmin} />
          <Route path='/student/:id' exact={true} component={Student} />
          <Route path='/student/admit-card/:sno' exact={true} component={AdmitCard} />
          <Route path='/adminDashboard/docs/:regNo' exact={true} component={DocList} />
          <Route component={Login} />
        </Switch>
      </Router>
    </div>

  );
}

export default App;
