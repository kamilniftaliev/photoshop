import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import { Provider } from 'react-redux';

// Components
import Header from './components/Header';
import Draw from './components/Draw';
import Statistics from './components/Statistics';
import ErrorHandler from './components/ErrorHandler';

import store from './store';

import { SessionModal } from 'modals';
import { useDarkMode } from 'hooks';

const GlobalStyles = createGlobalStyle`
  :root {
    --text-color: #fff;
    --header-color: #2d2f37;
    --panels-background-color: #282930;
    --tools-panel-width: 60px;
    --properties-panel-width: 250px;

    font-family: 'Maven Pro', sans-serif;
  }

  .light-theme {
    --text-color: #000;
    --header-color: #d3e2ff;
    --panels-background-color: #eff5fe;
  }

  // I wish I could use :is or :where :)
  svg:not(.MuiSvgIcon-root),
  svg:not(.MuiSvgIcon-root) g,
  svg:not(.MuiSvgIcon-root) path {
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
  const [darkMode, toggleDarkMode] = useDarkMode();

  return (
    <ErrorHandler>
      <Container>
        <Router>
          <Header />
          <Switch>
            <Route path="/statistics">
              <Statistics />
            </Route>
            <Route path="/">
              <Draw darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            </Route>
          </Switch>
        </Router>
        <SessionModal />

        <GlobalStyles />
      </Container>
    </ErrorHandler>
  );
}

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
