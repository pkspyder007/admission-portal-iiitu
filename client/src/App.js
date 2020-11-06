import React from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import './css/general.scss'
import Login from './pages/Login';
import Index from './pages/Index';
import AdmitCard from './components/AdmitCard';
import Register from './pages/Register';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact={true} component={Index} />
          <Route path="/login" exact={true} component={Login} />
          <Route path="/register" exact={true} component={Register} />
          <Route path="/admit-card" exact={true} component={AdmitCard} />
          <Route  component={Login} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
