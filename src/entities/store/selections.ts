import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface SelectionsState {
  data: number[];
}

const initialState: SelectionsState = {
  data: [],
};

interface CardCheckPayload {
  id: number;
  value: boolean;
}

export const selectionsSlice = createSlice({
  name: 'selections',
  initialState,
  reducers: {
    cardCheck: (state, action: PayloadAction<CardCheckPayload>) => {
      if (action.payload.value) {
        state.data = [...new Set([...state.data, action.payload.id])];
      } else {
        state.data = state.data.filter((id) => id !== action.payload.id);
      }
    },
  },
});

export const { cardCheck } = selectionsSlice.actions;
