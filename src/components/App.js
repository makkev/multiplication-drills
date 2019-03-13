import React, { Component } from 'react';
import './App.css';
// import logo from '../shared/images/logo.svg';
import Home from './Home/Home';
import {quiz} from '../shared/data/quiz';

class App extends Component {
  render() {
    return (
      <div className="App">
          {/* 
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
          */}
        <Home quiz={quiz} shuffle={true} />
      </div>
    );
  }
}

export default App;
