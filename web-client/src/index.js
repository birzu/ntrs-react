import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import ModalCtxProvider from './providers/Modal.provider';
import FormCtxProvider from './providers/FormCtx.provider';
import store from './redux/store';

import App from './App';

import './sass/main.scss';

ReactDOM.render(
  <Provider store={store}>
    <ModalCtxProvider>
      <FormCtxProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </FormCtxProvider>
    </ModalCtxProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
