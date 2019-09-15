import AnimProvider from './components/anim/AnimProvider';
import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <AnimProvider>
    <App />
  </AnimProvider>,
  document.getElementById('root')
);
