import React from 'react';
import './App.css';

import { BrowserRouter as Router, Route } from "react-router-dom";

// Component Imports
import EditCard from './components/edit-card.component';
import Dashboard from './components/dashboard.component';


function App() {
  return (
    <div className="App">

      {/* React-router-dom routing to Dashboard page and Edit card page */}
      <Router>
        <Route path= '/' exact component={Dashboard}></Route>
        <Route path= '/edit/:id' component={EditCard}></Route>
      </Router>


    </div>
  );
}

export default App;
