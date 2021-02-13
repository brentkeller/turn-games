import React from 'react';

const userDataStorageKey = 'turn-games-user';

export interface IUser {
  name: string;
}

export interface IUserContext {
  user?: IUser;
  updateUser: (user?: IUser) => void;
}

export const loadUser = () => {
  let data = localStorage.getItem(userDataStorageKey);
  if (!data) return undefined;
  return JSON.parse(data);
};

export const saveUser = (user?: IUser) => {
  if (user === undefined) localStorage.removeItem(userDataStorageKey);
  else localStorage.setItem(userDataStorageKey, JSON.stringify(user));
};

export const UserContext = React.createContext<IUserContext>({
  user: loadUser(),
  updateUser: (user?: IUser) => {},
});
