import { proxy } from '../api/api';

const REQUESTED = 'REQUEST';
const RECEIVED = 'RECEIVE';
const FAILED = 'FAILED';

const initialState = {}

let url = 'http://localhost:4005/search/'

export const actionCreators = {
    requestSearch: (city) => async dispatch => {
        url += city
        const request = proxy().get(url)

        dispatch({ type: REQUESTED, payload: {data: {}, loading: true} });

        try {
            const response = await request;
            const data = await response.data;
            initialState.data = data
            dispatch({ type: RECEIVED, payload: {data, loading: false} });
        } catch (Error) {
            console.dir('Error: requestSearch', Error)
            dispatch({ type: FAILED, payload: {error: Error, loading: false} })
        }
    },
}

export const reducer = (state, action) => {
    state = state || initialState;
    switch (action.type) {
        case REQUESTED:
        case RECEIVED:
        case FAILED:
        return { ...state, ...action.payload };
        default:
            return state;
    }
};