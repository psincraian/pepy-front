import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Project } from './project';

export const ConfigureStore = () => {
  return createStore(
    combineReducers({
      project: Project,
    }),
    applyMiddleware(thunk)
  );
};
