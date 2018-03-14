import { handleActions } from 'redux-actions';
import { initialState } from './config';

export const reducers = handleActions({
    SUBMIT: (state, action) => {
        return {
            ...state,
            text: ''
        }
    },

    CHANGE_USERNAME: (state, action) => {
        return {
            ...state,
            userName: action.payload
        }
    },

    CHANGE_TEXT: (state, action) => {
        return {
            ...state,
            text: action.payload
        }
    },

    RECIEVE_MESSAGE: (state, action) => {
        return {
            ...state,
            messages: state.messages.push({
                id: state.increment,
                text: action.payload.text,
                userName: action.payload.userName,
                avatar: action.payload.avatar,
                own: state.userName === action.payload.userName
            }),
            increment: state.increment + 1
        }
    }
}, initialState);