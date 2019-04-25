import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ConfigureStore } from './api/config';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import Project from './container/Project';
import { defaultTheme } from './shared/theme';
import Index from './container/Index';

const store = ConfigureStore();

class App extends Component {
  render() {
    const ProjectContainer = ({ match }) => {
      return <Project projectId={match.params.projectId} />;
    };

    return (
      <Provider store={store}>
        <Router>
          <MuiThemeProvider theme={defaultTheme}>
            <Switch>
              <Route exact path="/" component={Index} />
              <Route path="/project/:projectId" component={ProjectContainer} />
            </Switch>
          </MuiThemeProvider>
        </Router>
      </Provider>
    );
  }
}

export default App;