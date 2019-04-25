
const ERROR_404 = 'ERROR_404';
const REMOVE_ERRORS = 'REMOVE_ERRORS';

export const error404 = () => ({
    type: ERROR_404,
});

export const removeErrors = () => ({
    type: REMOVE_ERRORS,
});

export const Errors = (state = null, action) => {
    switch (action.type) {
        case ERROR_404:
            return { error: 404 };
        case REMOVE_ERRORS:
            return null;
        default:
            return state;
    }
};