import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  createProgress,
  updateProgress,
  getMyProgress,
} from '../api/apiService';
import { Progress, CreateProgress, UpdateProgress } from '../types';
import axios from 'axios';

export interface ProgressState {
  progressList: Progress[];
  currentProgress: Progress | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProgressState = {
  progressList: [],
  currentProgress: null,
  loading: false,
  error: null,
};

export const createNewProgress = createAsyncThunk<
  Progress, // Correct response type
  CreateProgress, // Correct request type
  { rejectValue: string }
>(
  'progress/createProgress',
  async (data: CreateProgress, { rejectWithValue }) => {
    try {
      const response = await createProgress(data);
      return response.data;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(
          err.response?.data || 'An unexpected error occurred'
        );
      }
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

export const updateExistingProgress = createAsyncThunk<
  Progress, // Correct response type
  UpdateProgress, // Correct request type
  { rejectValue: string }
>(
  'progress/updateProgress',
  async (data: UpdateProgress, { rejectWithValue }) => {
    try {
      const response = await updateProgress(data);
      return response.data;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(
          err.response?.data || 'An unexpected error occurred'
        );
      }
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

export const fetchMyProgress = createAsyncThunk<
  Progress[], // Correct response type
  string, // Request payload type
  { rejectValue: string }
>('progress/fetchMyProgress', async (id: string, { rejectWithValue }) => {
  try {
    const response = await getMyProgress(id);
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

const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createNewProgress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNewProgress.fulfilled, (state, action) => {
        state.loading = false;
        state.progressList.push(action.payload); // Optionally handle the new progress here if needed
      })
      .addCase(createNewProgress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateExistingProgress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateExistingProgress.fulfilled, (state, action) => {
        state.loading = false;
        // Optionally handle the updated progress here if needed
        const updatedProgress = action.payload;
        const index = state.progressList.findIndex(
          (progress) => progress.id === updatedProgress.id
        );
        if (index >= 0) {
          state.progressList[index] = updatedProgress;
        }
      })
      .addCase(updateExistingProgress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchMyProgress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyProgress.fulfilled, (state, action) => {
        state.loading = false;
        state.progressList = action.payload;
      })
      .addCase(fetchMyProgress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default progressSlice.reducer;
