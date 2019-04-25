import { error404 } from './errors';
import { BASE_URL, FETCHING_STATUS } from './constants';

const SHOW_PROJECT = 'SHOW_PROJECT';

// Actions
export const fetchProject = (projectId) => dispatch => {
    var url =
        BASE_URL +
        'projects/' +
        projectId;

    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(
            response => {
                if (response.ok) {
                    return response;
                } else {
                    var error = new Error(
                        'Error ' + response.status + ': ' + response.statusText
                    );
                    error.response = response;
                    throw error;
                }
            },
            error => {
                var errorMessage = new Error(error.errorMessage);
                throw errorMessage;
            }
        )
        .then(response => response.json())
        .then(response => dispatch(showProject(response)))
        .catch(error => {
            if (error.response !== undefined && error.response.status === 404) {
                dispatch(error404());
            }
        });
};

export const showProject = data => ({
    type: SHOW_PROJECT,
    payload: data,
});

export const Project = (
    state = {
        status: FETCHING_STATUS.noData,
    },
    action
) => {
    switch (action.type) {
        case SHOW_PROJECT:
            return { ...state, ...action.payload, status: FETCHING_STATUS.fetched };
        default:
            return state;
    }
};