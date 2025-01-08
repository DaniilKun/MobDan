import { createSlice } from '@reduxjs/toolkit';
import { User } from './user.model';

// Типизация состояния
export interface UserState {
	profile: User | null;
	isLoading: boolean;
	error: string | null;
}

// Начальное состояние
const initialState: UserState = {
	profile: { id: 1, name: 'Anton' },
	isLoading: false,
	error: null,
};

// Создаём Slice
const profileSlice = createSlice({
	name: 'profile',
	initialState,
	reducers: {},
});

export default profileSlice.reducer;
