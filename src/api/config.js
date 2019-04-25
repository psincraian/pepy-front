import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Project } from './project';
import { Errors } from './errors';

export const ConfigureStore = () => {
    return createStore(
        combineReducers({
            project: Project,
            errors: Errors,
        }),
        applyMiddleware(thunk)
    );
}