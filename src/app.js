import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import AdminRoute from './components/routes/admin';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Route path='/' component={AdminRoute} />
      </div>
    );
  }
}

export default App;
