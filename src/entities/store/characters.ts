import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apiRequest from '~/api/request';
import { TCharacter } from '~/api/types';

export const fetchCharacters = createAsyncThunk(
  'characters/fetch',
  async (args: { query?: string; page?: number; pageSize?: number }) => {
    const response = await apiRequest.characters(args);
    const { data, meta, error } = response;
    if (data) {
      return { data, meta };
    }
    throw Error(error?.message);
  }
);

interface CharactersState {
  available: TCharacter[];
  current: TCharacter[];
  total: number;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState: CharactersState = {
  available: [],
  current: [],
  total: 0,
  loading: 'idle',
};

export const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCharacters.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(fetchCharacters.fulfilled, (state, action) => {
      state.current = action.payload.data;
      state.available = [
        ...state.available.filter((item) => {
          return !action.payload.data.find((newOne) => newOne.id === item.id);
        }),
        ...action.payload.data,
      ];
      state.total = action.payload.meta?.pagination.total ?? 0;
      state.loading = 'succeeded';
    });
    builder.addCase(fetchCharacters.rejected, (state) => {
      state.loading = 'failed';
    });
  },
});
