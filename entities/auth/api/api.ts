// export const PREFIX = 'https://purpleschool.ru/api-v2';
export const PREFIX = 'https://mytasksapp.pythonanywhere.com/api';
// export const API = {
// 	login: `${PREFIX}/auth/login`,
// };
export const API = {
	registration: `${PREFIX}/auth/`,
	login: `${PREFIX}/auth/token/`,
	refresh: `${PREFIX}/auth/token/refresh/`,
};
