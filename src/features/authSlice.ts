// // authSlice.ts
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { register, login } from '../api/apiService';
// import { RegisterData, LoginData } from '../types';

// export interface AuthState {
//   isAuthenticated: boolean;
//   loading: boolean;
//   error: string | null;
// }

// const initialState: AuthState = {
//   // isAuthenticated: false,
//   isAuthenticated: !!localStorage.getItem('authToken'),
//   loading: false,
//   error: null,
// };

// export const registerUser = createAsyncThunk<
//   { message: string },
//   RegisterData,
//   { rejectValue: string }
// >('auth/registerUser', async (data: RegisterData, thunkAPI) => {
//   try {
//     const response = await register(data);
//     return response;
//   } catch (error) {
//     return thunkAPI.rejectWithValue((error as Error).message);
//   }
// });

// export const loginUser = createAsyncThunk<
//   { token: string },
//   LoginData,
//   { rejectValue: string }
// >('auth/loginUser', async (data: LoginData, thunkAPI) => {
//   try {
//     const response = await login(data);
//     return response;
//   } catch (error) {
//     return thunkAPI.rejectWithValue((error as Error).message);
//   }
// });

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     logout: (state) => {
//       state.isAuthenticated = false;
//       localStorage.removeItem('authToken');
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(registerUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(registerUser.fulfilled, (state) => {
//         state.loading = false;
//         state.isAuthenticated = true;
//       })
//       .addCase(registerUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       })
//       .addCase(loginUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.isAuthenticated = true;
//         localStorage.setItem('authToken', action.payload.token);
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       });
//   },
// });

// export const { logout } = authSlice.actions;
// export default authSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { register, login } from '../api/apiService';
import { RegisterData, LoginData } from '../types';

export interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const registerUser = createAsyncThunk<
  { message: string },
  RegisterData,
  { rejectValue: string }
>('auth/registerUser', async (data: RegisterData, thunkAPI) => {
  try {
    const response = await register(data);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue((error as Error).message);
  }
});

export const loginUser = createAsyncThunk<
  { token: string },
  LoginData,
  { rejectValue: string }
>('auth/loginUser', async (data: LoginData, thunkAPI) => {
  try {
    const response = await login(data);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue((error as Error).message);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      localStorage.removeItem('authToken');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        localStorage.setItem('authToken', action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
