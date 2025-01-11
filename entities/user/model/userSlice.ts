import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Organization, UserState } from './user.model';
import { API } from '@/api/api';
import axiosInstance from '@/api/axiosInstance'; // ✅ Правильный импорт axiosInstance
import axios from 'axios';

// Начальное состояние
const initialState: UserState = {
	organization: null,
	isLoading: false,
	error: null,
};

// ✅ Асинхронный thunk для создания организации
export const createOrganization = createAsyncThunk(
	'user/createOrganization',
	async (organizationData: { name: string }, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.post(API.create_organization, organizationData);
			return response.data; // Возвращаем данные о созданной организации
		} catch (error) {
			if (axios.isAxiosError(error)) {
				return rejectWithValue(error.response?.data?.message || 'Ошибка создания организации');
			}
			throw error;
		}
	},
);

// ✅ Асинхронный thunk для получения существующей организации
export const fetchOrganization = createAsyncThunk(
	'user/fetchOrganization',
	async (_, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.get(API.list_organization);

			// Проверяем, есть ли организации
			if (response.data.length > 0) {
				return response.data[0]; // Возвращаем первую организацию
			} else {
				return null; // Если организаций нет, возвращаем null
			}
		} catch (error) {
			// ✅ Если получили ошибку 401 (Unauthorized), перехватываем её и обрабатываем
			if (axios.isAxiosError(error) && error.response?.status === 401) {
				return rejectWithValue('Ошибка авторизации. Пожалуйста, войдите снова.');
			}
			throw error;
		}
	},
);

// ✅ Создаем slice
const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setOrganization: (state, action: PayloadAction<Organization | null>) => {
			state.organization = action.payload;
		},
		clearOrganization: (state) => {
			state.organization = null;
		},
	},
	extraReducers: (builder) => {
		builder
			// ✅ Обработка создания организации
			.addCase(createOrganization.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(createOrganization.fulfilled, (state, action) => {
				state.isLoading = false;
				state.organization = action.payload;
			})
			.addCase(createOrganization.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload as string;
			})
			// ✅ Обработка получения организации
			.addCase(fetchOrganization.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(fetchOrganization.fulfilled, (state, action) => {
				state.isLoading = false;
				state.organization = action.payload;
			})
			.addCase(fetchOrganization.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload as string;
			});
	},
});

export const { setOrganization, clearOrganization } = userSlice.actions;

export default userSlice.reducer;
