import authService from '../../service/api/auth';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { LoginCredentials, RegisterCredentials, User } from '../../@types/auth';
import { AxiosError } from 'axios';

export const loginUser = createAsyncThunk<
User,
LoginCredentials,
{ rejectValue: string }
>('auth/login', async (credentials, { rejectWithValue }) => {
try {
  const response = await authService.login(credentials);

  console.log("user from login", response)
  return response.user;
} catch (error) {
  console.error('Login error:', error);
  // Check if the error is an AxiosError and handle it accordingly
  return rejectWithValue(error instanceof AxiosError ? error.message : 'Failed to login');
}
});

export const registerUser = createAsyncThunk<
User,
RegisterCredentials,
{ rejectValue: string }
>('auth/register', async (userData, { rejectWithValue }) => {
try {
  const response = await authService.register(userData);
  return response.user;
} catch (error) {
  return rejectWithValue(error instanceof Error ? error.message : 'Registration failed');
}
});

export const getCurrentUser = createAsyncThunk<
User,
void,
{ rejectValue: string }
>('auth/getCurrentUser', async (_, { rejectWithValue }) => {
try {
  return await authService.getCurrentUser();
} catch (error) {
  return rejectWithValue(error instanceof Error ? error.message : 'Failed to get user profile');
}
});