import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import { Provider } from 'react-redux';

import Header from './components/Header';
import Draw from './components/Draw';
import Statistics from './components/Statistics';
import store from './store';

const GlobalStyles = createGlobalStyle`
  :root {
    --text-color: #fff;
    --header-color: #2d2f37;
    --panels-background-color: #282930;
    --tools-panel-width: 60px;

    font-family: 'Maven Pro', sans-serif;
  }

  .light-theme {
    --text-color: #000;
    --header-color: #d3e2ff;
    --panels-background-color: #eff5fe;
  }

  svg,
  svg g,
  svg path {
    fill: var(--text-color);
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
`;

function App() {
  return (
    <Container>
      <Provider store={store}>
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
      </Provider>

      <GlobalStyles />
    </Container>
  );
}

render(<App />, document.getElementById('root'));
