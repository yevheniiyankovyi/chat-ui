import { reducers } from './reducers';
import { initialState } from './config';
import { List } from 'immutable';
import * as constants from '../actions/constants';

// Mock reducers intial state object
jest.mock('./config', () => {
    return {
            initialState: {
            increment: 0,
            userName: 'userName_test',
            avatar: 'avatar_test',
            text: ''
        }
    };
})

describe(constants.SUBMIT + ' Action reducers', () => {
    const action = {
        type: constants.SUBMIT
    };
    it('Default state intialization', () => {
        expect(reducers(undefined, action)).toEqual({
            increment: 0,
            userName: 'userName_test',
            avatar: 'avatar_test',
            text: ''
        });
    });

    it('Submited text should be cleaned', () => {
        let state = {
            increment: 0,
            userName: 'userName_test1',
            avatar: 'avatar_test1',
            text: 'justtext'
        };

        let result = state;
        result.text = '';

        expect(reducers(state, action)).toEqual(result);
    });
});

describe(constants.CHANGE_USERNAME + ' action reducer', () => {
    const action = {
        type: constants.CHANGE_USERNAME
    };

    it('User name should be changed', () => {
        let newUserName = 'test_result';
        let state = {
            increment: 0,
            userName: 'userName_test12',
            avatar: 'avatar_test12',
            text: 'justtext'
        };
        let result = state;
        result.userName = newUserName;

        action.payload = newUserName;

        expect(reducers(state, action)).toEqual(result);
    });
});

describe(constants.CHANGE_TEXT + ' action reducer', () => {
    const action = {
        type: constants.CHANGE_TEXT
    };

    it('User name should be changed', () => {
        let text = 'test_result';
        let state = {
            increment: 0,
            userName: 'userName_test123',
            avatar: 'avatar_test123',
            text: 'justtext'
        };
        let result = state;
        result.text = text;

        action.payload = text;

        expect(reducers(state, action)).toEqual(result);
    });
});

describe(constants.RECIEVE_MESSAGE + ' action reducer', () => {
    const action = {
        type: constants.RECIEVE_MESSAGE
    };

    it('Push message in to list of messages', () => {
        let mockFunction = jest.fn();

        let state = {
            increment: 4,
            userName: 'userName_test1234',
            avatar: 'avatar_test1234',
            text: 'justtext',
            messages: {
                push: mockFunction
            }
        };

        action.payload = {
            text: 'onetwo',
            userName: 'superusername',
            avatar: 'justsimpleavatar'
        }
        
        let result = reducers(state, action);
        expect(mockFunction).toBeCalled();
        expect(result.increment).toEqual(5);
    });
});