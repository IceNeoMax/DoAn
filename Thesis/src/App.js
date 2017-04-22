import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import Router from './Router';
import {AsyncStorage} from 'react-native';

class App extends Component {


  componentWillMount() {
    const config = {
      apiKey: 'AIzaSyCoSRUrL9OYlxrhzkJb1I2GeR-ozJmqyW4',
      authDomain: 'thesis-cdeaa.firebaseapp.com',
      databaseURL: 'https://thesis-cdeaa.firebaseio.com',
      storageBucket: 'thesis-cdeaa.appspot.com',
      messagingSenderId: '873234581670'
    };
    firebase.initializeApp(config);
  }

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;
