export const PREFIX = 'https://mytasksapp.pythonanywhere.com/api';

export const API = {
	registration: `${PREFIX}/auth/`,
	login: `${PREFIX}/auth/token/`,
	refresh: `${PREFIX}/auth/token/refresh/`,
	create_organization: `${PREFIX}/organizations/create/`,
	list_organization: `${PREFIX}/organizations/list/`,
};
