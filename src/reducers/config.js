import { List } from 'immutable';
import * as storage from '../actions/utils';

// State initialization
export const initialState = {
    increment: 0,
    messages: List([]),
    userName: storage.getUserName(),
    avatar: storage.getAvatar(),
    text: ''
};