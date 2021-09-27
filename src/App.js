import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ConfigureStore } from './api/config';
import { Router, Switch, Route } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import Project from './container/Project';
import { defaultTheme } from './shared/theme';
import Index from './container/Index';
import { createBrowserHistory } from 'history';
import About from './container/About';
import NotFound from './container/NotFound';
import Newsletter from './container/Newsletter';
import PersonalizedBadge from './container/PersonalizedBadge';

const store = ConfigureStore();

const browserHistory = createBrowserHistory();

class App extends Component {
  render() {
    const ProjectContainer = ({ match }) => {
      return <Project projectId={match.params.projectId} />;
    };

    const PersonalizedBadgeContainer = ({ match }) => {
      return <PersonalizedBadge project={match.params.projectId} />;
    };

    return (
      <Provider store={store}>
        <Router history={browserHistory}>
          <MuiThemeProvider theme={defaultTheme}>
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
          </MuiThemeProvider>
        </Router>
      </Provider>
    );
  }
}

export default App;
