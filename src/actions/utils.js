import { imgs } from '../config';

const USER_NAME = "userName";
const AVATAR = "avatar";

export const setUserName = (userName) => {
    localStorage.setItem(USER_NAME, userName);
};

export const getUserName = () => {
    return localStorage.getItem(USER_NAME);
};

export const setAvatar =  (avatar) => {
    localStorage.setItem(AVATAR, avatar);
};

export const getAvatar = () => {
    let avatar = localStorage.getItem(AVATAR);

    if (!avatar)
    {
        avatar = getRandomValue(imgs);
        setAvatar(avatar);
    }

    return avatar;
}

const getRandomValue = (array) => {
    return array[Math.floor(Math.random() * array.length)];
} 