import React from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import './css/general.scss'
import RegistrationForm from './pages/Form3';
import Login from './pages/Login';
import Dashboard from './components/Dashboard';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
       <Switch>
          <Route path="/" exact={true} component={Dashboard} />
          <Route path="/login" exact={true} component={Login} />
          <Route path="/form3" exact={true} component={RegistrationForm} />
       </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
