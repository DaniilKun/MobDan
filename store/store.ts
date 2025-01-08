import { configureStore } from '@reduxjs/toolkit';
import authReducer, { loadToken } from '@/entities/auth/model/authSlice';
import profileReducer from '@/entities/user/model/userSlice';
import registrationReducer from '@/entities/auth/model/registrationSlice';

const store = configureStore({
	reducer: {
		auth: authReducer,
		profile: profileReducer,
		registration: registrationReducer,
	},
});

// ✅ Загружаем токен при старте приложения
store.dispatch(loadToken());

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
