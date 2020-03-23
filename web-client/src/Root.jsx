import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import ModalCtxProvider from './providers/Modal.provider';
import FormCtxProvider from './providers/FormCtx.provider';
import store from './redux/store';

import App from './App';
import './sass/main.scss';

export default function() {
  return (
    <Provider store={store}>
      <ModalCtxProvider>
        <FormCtxProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </FormCtxProvider>
      </ModalCtxProvider>
    </Provider>
  );
}
