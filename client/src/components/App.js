import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import logo from '../logo.svg';
import '../App.css';

import Header from './Header';
import Main from './Main';
import Search from './Search';
import Subject from './Subject';
import Write from './Write';

class App extends Component {
  render() {

    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <Header/>
            <Route exact path="/" component={Main}/>
            <Route exact path="/search" component={Search}/>
            <Route exact path="/subjects/:subject_name" component={Subject}/>
            <Route exact path="/write" component={Write}/>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
