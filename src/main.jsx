
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot from react-dom/client
import App from './App';
import { Provider } from 'react-redux';
import  store  from './redux/store.js';
import '../src/App.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'react-toastify/dist/ReactToastify.css';




const root = document.getElementById('root');

createRoot(root).render(
  <Provider store={store}>
     
    <App />
  </Provider>
);
