import React, { Component } from 'react';
import './App.scss';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from './store/index';
import Routes from './components/routing/Routes';
import Header from './components/Header/Header';

const store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Header />
          <Switch>
            <Routes />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
