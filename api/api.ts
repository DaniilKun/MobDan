export const PREFIX = 'https://mytasksapp.pythonanywhere.com/api';

export const API = {
	registration: `${PREFIX}/auth/`,
	login: `${PREFIX}/auth/token/`,
	refresh: `${PREFIX}/auth/token/refresh/`,
	create_organization: `${PREFIX}/organizations/create/`,
	list_organization: `${PREFIX}/organizations/list/`,
	list_tasks: `${PREFIX}/tasks/list/`,
	create_tasks: `${PREFIX}/tasks/create/`,
	status_tasks: `${PREFIX}/tasks/status/`,
	user_me: `${PREFIX}/user/me/`,
	delete_user_me: `${PREFIX}/user/me/delete/`,

	// ✅ Динамический URL для удаления задачи
	delete_task: (id: number) => `${PREFIX}/tasks/${id}/delete/`,
	update_task: (id: number) => `${PREFIX}/tasks/${id}/edit/`,
};
