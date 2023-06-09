import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {Provider} from "react-redux";
import {store} from "./bll/store";
import { MantineProvider } from '@mantine/core';
import App from './ui/components/App/App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
      <MantineProvider theme={{
          fontFamily: 'Inter, sans-serif',
      }}>
          <App />
      </MantineProvider>
  </Provider>
);
