import userReducer, { fetchUser } from '@/entities/user/userSlice';
import { configureStore } from '@reduxjs/toolkit';
import authReducer, { loadToken } from '@/entities/auth/model/authSlice';
import organizationReducer from '@/entities/organization/model/organizationSlice';
import registrationReducer from '@/entities/auth/model/registrationSlice';
import tasksReducer from '@/entities/tasks/tasksSlice';
import statusReducer from '@/entities/status/statusSlice';

const store = configureStore({
	reducer: {
		auth: authReducer,
		organization: organizationReducer,
		registration: registrationReducer,
		user: userReducer,
		tasks: tasksReducer,
		status: statusReducer,
	},
});

// ✅ Загружаем токен при старте приложения
store.dispatch(loadToken()).then(() => {
	// ✅ После загрузки токена запрашиваем данные пользователя
	store.dispatch(fetchUser()).catch((err) => {
		console.error('Error when receiving user data:', err);
	});
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
