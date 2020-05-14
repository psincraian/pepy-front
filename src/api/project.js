import { BASE_URL, FETCHING_STATUS } from './constants';

const SHOW_PROJECT = 'SHOW_PROJECT';
const LOAD_PROJECT = 'LOAD_PROJECT';
const ERROR_404 = 'ERROR_404';
const ERROR_5XX = 'ERROR_5XX';

// Actions
export const fetchProject = (projectId) => (dispatch) => {
  var url = BASE_URL + '/api/v2/projects/' + projectId;

  dispatch(loadProject());
  return fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(
      (response) => {
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
      (error) => {
        var errorMessage = new Error(error.errorMessage);
        throw errorMessage;
      }
    )
    .then((response) => response.json())
    .then((response) => dispatch(showProject(response)))
    .catch((error) => {
      if (error.response !== undefined && error.response.status === 404) {
        dispatch(error404(projectId));
      } else if (error.response !== undefined && error.response.status >= 500) {
        dispatch(error5XX(projectId, error.response.status));
      }
    });
};

export const showProject = (data) => ({
  type: SHOW_PROJECT,
  payload: data,
});

export const loadProject = () => ({
  type: LOAD_PROJECT,
});

export const error404 = (projectId) => ({
  type: ERROR_404,
  projectId: projectId,
});

export const error5XX = (projectId, error) => ({
  type: ERROR_5XX,
  error: error,
  projectId: projectId,
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
    case LOAD_PROJECT:
      return { status: FETCHING_STATUS.fetching };
    case ERROR_404:
      return {
        status: FETCHING_STATUS.fetched,
        error: 404,
        projectId: action.projectId,
      };
    case ERROR_5XX:
      return {
        status: FETCHING_STATUS.fetched,
        error: action.error,
        projectId: action.projectId,
      };
    default:
      return state;
  }
};
