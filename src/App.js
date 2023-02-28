import React from 'react';
import { Provider } from 'react-redux';
import { ConfigureStore } from './api/config';
import { Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import Project from './container/Project';
import { defaultTheme } from './shared/theme';
import Index from './container/Index';
import { createBrowserHistory } from 'history';
import About from './container/About';
import NotFound from './container/NotFound';
import Newsletter from './container/Newsletter';
import PersonalizedBadge from './container/PersonalizedBadge';
import { Helmet } from 'react-helmet';

const store = ConfigureStore();

const browserHistory = createBrowserHistory();

const App = () => {
  const ProjectContainer = ({ match }) => {
    return <Project projectId={match.params.projectId} />;
  };

  const PersonalizedBadgeContainer = ({ match }) => {
    return <PersonalizedBadge project={match.params.projectId} />;
  };

  var analytics = null;

  if (
    window.location.hostname !== 'localhost' &&
    window.location.hostname !== '127.0.0.1'
  ) {
    analytics = (
      <script
        type="text/javascript"
        defer
        src="https://static.cloudflareinsights.com/beacon.min.js"
        data-cf-beacon='{"token": "111f0448a8e642be96fa63fb3370ba21"}'
      ></script>
    );
  }

  return (
    <Provider store={store}>
      <Router history={browserHistory}>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={defaultTheme}>
            <Helmet>{analytics}</Helmet>
            <Switch>
              <Route exact path="/" component={Index} />
              <Route
                exact
                path="/project/:projectId"
                component={ProjectContainer}
              />
              <Route
                exact
                path="/project/:projectId/personalized-badge"
                component={PersonalizedBadgeContainer}
              />
              <Route exact path="/about" component={About} />
              <Route exact path="/newsletter" component={Newsletter} />
              <Route path="*" component={NotFound} />
            </Switch>
          </ThemeProvider>
        </StyledEngineProvider>
      </Router>
    </Provider>
  );
};

export default App;
