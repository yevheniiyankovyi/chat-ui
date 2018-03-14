import { createAction } from 'redux-actions';
import { socketConfig } from '../config';
import io from 'socket.io-client';
import * as storage from './utils';
import * as constants from './constants'

let socket;

const submit = createAction(constants.SUBMIT);
const applyUserName = createAction(constants.CHANGE_USERNAME);
const addMessageToBorardFromServer = createAction(constants.RECIEVE_MESSAGE);

export const changeText = createAction(constants.CHANGE_TEXT);

export const changeUserName = (userName) => (dispatch) => {
    storage.setUserName(userName);

    dispatch(applyUserName(userName));
};

export const sendMessage = () => (dispatch, getState) => {
    let currentState = getState();

    let isValid = currentState.text === '' || currentState.userName === '';

    if (!isValid)
    {
        socket.emit(socketConfig.event, {
            avatar: currentState.avatar,
            userName: currentState.userName,
            text: currentState.text
        });

        dispatch(submit());
    }
};

export const connectToSocket = () => (dispatch) => {
    socket = io.connect(socketConfig.endpoit);
    socket.on('connect', () => onConnect(dispatch));
}

const onConnect = (dispatch) => {
    socket.on(socketConfig.event, (msg) => {
        dispatch(addMessageToBorardFromServer(msg));
    })
};