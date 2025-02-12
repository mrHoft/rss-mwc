import { configureStore } from '@reduxjs/toolkit';
import { charactersSlice } from './characters';
import { selectionsSlice } from './selections';

export const store = configureStore({
  reducer: {
    characters: charactersSlice.reducer,
    selections: selectionsSlice.reducer,
  },
});

export type TRootState = ReturnType<typeof store.getState>;
export type TAppDispatch = typeof store.dispatch;
