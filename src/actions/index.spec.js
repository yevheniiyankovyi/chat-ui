import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import * as storage from './utils';
import * as actions from './index';
import * as constants from './constants';
import io from 'socket.io-client';

const middlewares = [thunkMiddleware];
const mockStore = configureMockStore(middlewares);

jest.mock('./utils', () => {
    return {
        setUserName: jest.fn()
    };
});

jest.mock('socket.io-client');

describe('Send message', () => {
    io.connect.mockReturnValue({
        on: jest.fn(),
        emit: jest.fn()
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('User name should be stored in storage', () => {
        let mockFunction = storage.setUserName;
    
        const initialState = { text: '' };
        let name = 'testtest';
        const store = mockStore(initialState);
        store.dispatch(actions.changeUserName(name));

        let result = store.getActions();

        expect(mockFunction).toBeCalled();
    });

    it('applyUserName should be called when changeUserName executed', () => {
        const initialState = {
            text: ''
        };
        let name = 'testtest';

        const store = mockStore(initialState);
        store.dispatch(actions.changeUserName(name));

        let result = store.getActions();
        expect(result).toEqual([{ 
            type: constants.CHANGE_USERNAME,
            payload: name
        }]);
    });

    it('Should call connect socket.io client', () => {
        const store = mockStore({});
        store.dispatch(actions.connectToSocket());

        expect(io.connect).toBeCalled();
    });

    it('Actipon changeText should be caled', () => {
        const store = mockStore({});
        store.dispatch(actions.changeText());

        let result = store.getActions();
        expect(result).toEqual([{ type: constants.CHANGE_TEXT }]);
    });

    it('Send message should do nothing if text and username is empty', () => {
        const store = mockStore({
            text: '',
            userName: ''
        });

        store.dispatch(actions.sendMessage());

        let result = store.getActions();
        expect(result.length).toBe(0);
    });

    it('Send message should do nothing if username is empty', () => {
        let store = mockStore({
            text: 'not_empty',
            userName: ''
        });

        store.dispatch(actions.sendMessage());

        let result = store.getActions();
        expect(result.length).toBe(0);
    });

    it('Send message should do nothing if text is empty', () => {
        let store = mockStore({
            text: '',
            userName: 'not_empty'
        });

        store.dispatch(actions.sendMessage());

        let result = store.getActions();
        expect(result.length).toBe(0);
    });

    it('Submit should be dispatched', () => {
        let store = mockStore({
            text: 'not_empty',
            userName: 'not_empty_too'
        });

        store.dispatch(actions.sendMessage());

        let result = store.getActions();
        expect(result).toEqual([{ type: constants.SUBMIT }]);
    });

    it('Emit should be called with valid arguments', () => {
        let mockSocket = io.connect();

        const store = mockStore({
            avatar: 'image',
            text: 'sometextvalue',
            userName: 'justname'
        });

        store.dispatch(actions.sendMessage());

        expect(mockSocket.emit).toBeCalled();
        expect(mockSocket.emit.mock.calls[0][1]).toEqual({
            avatar: 'image',
            text: 'sometextvalue',
            userName: 'justname'
        });
    });
});