import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { TCharacter } from '~/api/types';

interface SelectionsState {
  selected: number[];
  available: TCharacter[];
}

const initialState: SelectionsState = {
  selected: [],
  available: [],
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
        state.selected = [...new Set([...state.selected, action.payload.id])];
      } else {
        state.selected = state.selected.filter((id) => id !== action.payload.id);
      }
    },
    uncheckAll: (state) => {
      state.selected = [];
    },
    updateAvailableCharacters: (state, action: PayloadAction<TCharacter[]>) => {
      state.available = [
        ...state.available.filter((item) => !action.payload.find((newOne) => newOne.id === item.id)),
        ...action.payload,
      ];
    },
  },
});

export const { cardCheck, uncheckAll, updateAvailableCharacters } = selectionsSlice.actions;
