import { hot } from 'react-hot-loader/root';
import React, { Suspense, lazy } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import { Provider } from 'react-redux';

// Components
import Header from './components/Header';
import ErrorHandler from './components/ErrorHandler';
// Dynamic import both pages.
// Introduces route based code splitting
const Draw = lazy(() => import('./components/Draw'));
const Statistics = lazy(() => import('./components/Statistics'));

import store from './store';

// Modals
import { SessionModal } from 'modals';

// Hooks
import { useDarkMode } from 'hooks';

// Icons
import { PreloaderIcon } from 'icons';

const Preloader = styled(PreloaderIcon)`
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
`;

const GlobalStyles = createGlobalStyle`
  :root {
    // Theme variables
    --text-color: #fff;
    --header-color: #2d2f37;
    --panels-background-color: #282930;

    --tools-panel-width: 60px;
    --properties-panel-width: 250px;

    font-family: 'Maven Pro', sans-serif;
  }

  .light-theme {
    // Theme variables
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

/**
 * Root component of the app
 */
function App() {
  const [darkMode, toggleDarkMode] = useDarkMode();

  return (
    <ErrorHandler>
      <Container>
        <Router>
          <Header />

          {/* Preloader while pages are loading */}
          <Suspense fallback={<Preloader />}>
            <Switch>
              <Route path="/statistics">
                <Statistics />
              </Route>
              <Route path="/">
                <Draw darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
              </Route>
            </Switch>
          </Suspense>
        </Router>
        <SessionModal />

        <GlobalStyles />
      </Container>
    </ErrorHandler>
  );
}

const HotApp = hot(App);

render(
  <Provider store={store}>
    <HotApp />
  </Provider>,
  document.getElementById('root')
);
