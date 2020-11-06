import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';

import Header from './components/Header';
import Draw from './components/Draw';
import Statistics from './components/Statistics';

const GlobalStyles = createGlobalStyle`
  :root {
    font-family: 'Maven Pro', sans-serif;
  }
`;

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Switch>
          <Route path="/statistics">
            <Statistics />
          </Route>
          <Route path="/">
            <Draw />
          </Route>
        </Switch>
      </Router>

      <GlobalStyles />
    </div>
  );
}

render(<App />, document.getElementById('root'));
