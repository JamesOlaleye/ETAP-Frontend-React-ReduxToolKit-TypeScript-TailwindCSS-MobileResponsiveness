import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  createSubject,
  getAllSubjects,
  getSubject,
  assignTeacher,
} from '../api/apiService';
import { Subject, CreateSubject, AssignTeacher } from '../types';
import axios from 'axios';

export interface SubjectState {
  subjects: Subject[];
  currentSubject: Subject | null;
  loading: boolean;
  error: string | null;
}

const initialState: SubjectState = {
  subjects: [],
  currentSubject: null,
  loading: false,
  error: null,
};

export const createNewSubject = createAsyncThunk<
  Subject, // Correct response type
  CreateSubject, // Correct request type
  { rejectValue: string }
>('subject/createSubject', async (data: CreateSubject, { rejectWithValue }) => {
  try {
    const response = await createSubject(data);
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

export const fetchAllSubjects = createAsyncThunk<
  Subject[], // Correct response type
  void, // No request payload
  { rejectValue: string }
>('subject/fetchAllSubjects', async (_, { rejectWithValue }) => {
  try {
    const response = await getAllSubjects();
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

export const fetchSubject = createAsyncThunk<
  Subject, // Correct response type
  string, // Request payload type
  { rejectValue: string }
>('subject/fetchSubject', async (id: string, { rejectWithValue }) => {
  try {
    const response = await getSubject(id);
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

export const assignTeacherToSubject = createAsyncThunk<
  { message: string }, // Correct response type
  AssignTeacher, // Correct request type
  { rejectValue: string }
>('subject/assignTeacher', async (data: AssignTeacher, { rejectWithValue }) => {
  try {
    const response = await assignTeacher(data);
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

const subjectSlice = createSlice({
  name: 'subject',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createNewSubject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNewSubject.fulfilled, (state, action) => {
        state.loading = false;
        state.subjects.push(action.payload);  // Optionally, you can update the state with the new subject if needed
      })
      .addCase(createNewSubject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchAllSubjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllSubjects.fulfilled, (state, action) => {
        state.loading = false;
        state.subjects = action.payload;
      })
      .addCase(fetchAllSubjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchSubject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubject.fulfilled, (state, action) => {
        state.loading = false;
        state.currentSubject = action.payload;
      })
      .addCase(fetchSubject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(assignTeacherToSubject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(assignTeacherToSubject.fulfilled, (state) => {
        state.loading = false;
        // Optionally, you can update the state if needed
      })
      .addCase(assignTeacherToSubject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default subjectSlice.reducer;
