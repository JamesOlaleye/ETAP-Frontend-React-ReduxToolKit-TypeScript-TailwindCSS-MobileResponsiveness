import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  createTopic,
  updateTopic,
  getTopic,
  getTopicsBySubject,
} from '../api/apiService';
import { Topic, CreateTopic, UpdateTopic } from '../types';
import axios from 'axios';

export interface TopicState {
  topics: Topic[];
  currentTopic: Topic | null;
  loading: boolean;
  error: string | null;
}

const initialState: TopicState = {
  topics: [],
  currentTopic: null,
  loading: false,
  error: null,
};

export const createNewTopic = createAsyncThunk<
  Topic, // Correct response type
  CreateTopic, // Correct request type
  { rejectValue: string }
>('topic/createTopic', async (data: CreateTopic, { rejectWithValue }) => {
  try {
    const response = await createTopic(data);
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

export const updateExistingTopic = createAsyncThunk<
  Topic, // Correct response type
  UpdateTopic, // Correct request type
  { rejectValue: string }
>('topic/updateTopic', async (data: UpdateTopic, { rejectWithValue }) => {
  try {
    const response = await updateTopic(data);
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

export const fetchTopic = createAsyncThunk<
  Topic, // Correct response type
  string, // Request payload type
  { rejectValue: string }
>('topic/fetchTopic', async (id: string, { rejectWithValue }) => {
  try {
    const response = await getTopic(id);
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

export const fetchTopicsBySubject = createAsyncThunk<
  Topic[], // Correct response type
  string, // Request payload type
  { rejectValue: string }
>('topic/fetchTopicsBySubject', async (id: string, { rejectWithValue }) => {
  try {
    const response = await getTopicsBySubject(id);
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

const topicSlice = createSlice({
  name: 'topic',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createNewTopic.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNewTopic.fulfilled, (state, action) => {
        state.loading = false;
        state.topics.push(action.payload); // Optionally, update the state with the new topic if needed
      })
      .addCase(createNewTopic.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateExistingTopic.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateExistingTopic.fulfilled, (state, action) => {
        state.loading = false;
        // Optionally, update the state with the updated topic if needed
        const updatedTopic = action.payload;
        const index = state.topics.findIndex(
          (topic) => topic.id === updatedTopic.id
        );
        if (index >= 0) {
          state.topics[index] = updatedTopic;
        }
      })
      .addCase(updateExistingTopic.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchTopic.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTopic.fulfilled, (state, action) => {
        state.loading = false;
        state.currentTopic = action.payload;
      })
      .addCase(fetchTopic.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchTopicsBySubject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTopicsBySubject.fulfilled, (state, action) => {
        state.loading = false;
        state.topics = action.payload;
      })
      .addCase(fetchTopicsBySubject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default topicSlice.reducer;
