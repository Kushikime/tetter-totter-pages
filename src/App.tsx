import React from 'react';
import { Provider, useDispatch } from 'react-redux';
import './App.css';
import { Content } from './Components/Content';
import { Header } from './Components/Header';
import store from './Store/store';

function App() {

  return (
    <Provider store={store}>
      <>
        <Header />

        <Content />
      </>
    </Provider>
  );
}

export default App;
