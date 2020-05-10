import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ConfigureStore } from './api/config';
import { Router, Switch, Route } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import Project from './container/Project';
import { defaultTheme } from './shared/theme';
import Index from './container/Index';
import ReactGA from 'react-ga';
import { createBrowserHistory } from 'history';
import * as Sentry from '@sentry/browser';
import About from './container/About';

const store = ConfigureStore();

if (process.env.NODE_ENV === 'production') {
  ReactGA.initialize('UA-115993635-1');
  Sentry.init({
    dsn: 'https://a43da4d2db724dd1b7dd57346c47a880@sentry.io/1501896',
  });
}

const browserHistory = createBrowserHistory();
browserHistory.listen((location) => {
  ReactGA.pageview(location.pathname + location.search);
});

class App extends Component {
  componentDidMount() {
    ReactGA.pageview(window.location.pathname);
  }

  render() {
    const ProjectContainer = ({ match }) => {
      return <Project projectId={match.params.projectId} />;
    };

    return (
      <Provider store={store}>
        <Router history={browserHistory}>
          <MuiThemeProvider theme={defaultTheme}>
            <Switch>
              <Route exact path="/" component={Index} />
              <Route path="/project/:projectId" component={ProjectContainer} />
              <Route path="/about" component={About} />
            </Switch>
          </MuiThemeProvider>
        </Router>
      </Provider>
    );
  }
}

export default App;
