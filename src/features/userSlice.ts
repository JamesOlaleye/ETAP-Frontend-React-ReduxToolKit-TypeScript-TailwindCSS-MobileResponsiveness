import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUser, getAllUsers, promoteUser } from '../api/apiService';
import { User } from '../types';
import axios from 'axios';

export interface UserState {
  users: User[];
  currentUser: User | null;
  role: string | null; // Add this line
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  currentUser: null,
  role: null, // Add this line
  loading: false,
  error: null,
};

export const fetchUser = createAsyncThunk<
  User & { role: string }, // Correct response type
  string,
  { rejectValue: string }
>('user/fetchUser', async (id: string, { rejectWithValue }) => {
  try {
    const response = await getUser(id);
    return { ...response.data, role: response.data.role }; // Include role in the return object
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      return rejectWithValue(
        err.response?.data || 'An unexpected error occurred'
      );
    }
    return rejectWithValue('An unexpected error occurred');
  }
});

export const fetchAllUsers = createAsyncThunk<
  User[],
  void,
  { rejectValue: string }
>('user/fetchAllUsers', async (_, { rejectWithValue }) => {
  try {
    const response = await getAllUsers();
    return response.data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      return rejectWithValue(
        err.response?.data || 'An unexpected error occurred'
      );
    }
    return rejectWithValue('An unexpected error occurred');
  }
});

export const promoteUserRole = createAsyncThunk<
  { message: string },
  string,
  { rejectValue: string }
>('user/promoteUserRole', async (id: string, { rejectWithValue }) => {
  try {
    const response = await promoteUser(id);
    return response.data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      return rejectWithValue(
        err.response?.data || 'An unexpected error occurred'
      );
    }
    return rejectWithValue('An unexpected error occurred');
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
        state.role = action.payload.role; // Store the role from the response
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(promoteUserRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(promoteUserRole.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(promoteUserRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default userSlice.reducer;
