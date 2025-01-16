import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Organization, UserState } from './organization.model';
import { API } from '@/api/api';
import axiosInstance from '@/api/axiosInstance';
import axios from 'axios';

const initialState: UserState = {
	organization: null,
	isLoading: false,
	error: null,
};

export const createOrganization = createAsyncThunk(
	'user/createOrganization',
	async (organizationData: { name: string }, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.post(API.create_organization, organizationData);
			return response.data;
		} catch (error) {
			if (axios.isAxiosError(error)) {
				return rejectWithValue(error.response?.data?.message || 'Organization creation error');
			}
			throw error;
		}
	},
);

export const fetchOrganization = createAsyncThunk(
	'user/fetchOrganization',
	async (_, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.get(API.list_organization);

			if (response.data.length > 0) {
				return response.data[0];
			} else {
				return null;
			}
		} catch (error) {
			if (axios.isAxiosError(error) && error.response?.status === 401) {
				return rejectWithValue('Authorization error. Please log in again.');
			}
			throw error;
		}
	},
);

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
