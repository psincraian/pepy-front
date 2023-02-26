import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Project } from './project';
import { Subscribe } from './subscribe';

export const ConfigureStore = () => {
  return createStore(
    combineReducers({
      project: Project,
      subscribe: Subscribe,
    }),
    applyMiddleware(thunk)
  );
};
