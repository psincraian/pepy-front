import { ANALYTICS_BASE_URL, FETCHING_STATUS } from './constants';

const SUCCESS = 'SUCCESS';
const LOADING = 'LOADING';
const ERROR_5XX = 'ERROR_5XX';

// Actions
export const subscribe = (email, project) => (dispatch) => {
  var url = ANALYTICS_BASE_URL + '/subscriptions';

  dispatch(loading());
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      email: email,
      project: project,
    }),
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
    .then((response) => {
      if (response.status === 201) {
        dispatch(success(response))
      } else {
        dispatch(error5XX());
      }
    })
    .catch((error) => {
      dispatch(error5XX());
    });
};

export const success = (data) => ({
  type: SUCCESS,
  payload: data,
});

export const loading = () => ({
  type: LOADING,
});

export const error5XX = () => ({
  type: ERROR_5XX,
});

export const Subscribe = (
  state = {
    status: FETCHING_STATUS.noData,
  },
  action
) => {
  switch (action.type) {
    case SUCCESS:
      return { status: FETCHING_STATUS.fetched };
    case LOADING:
      return { status: FETCHING_STATUS.fetching };
    case ERROR_5XX:
      return {
        status: FETCHING_STATUS.fetched,
        error: 500,
      };
    default:
      return state;
  }
};
