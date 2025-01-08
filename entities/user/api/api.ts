export const PREFIX = 'https://mytasksapp.pythonanywhere.com/api';

export const API = {
	registration: `${PREFIX}/auth/`,
	login: `${PREFIX}/auth/token/`,
	refresh: `${PREFIX}/auth/token/refresh/`,
};
