import { configureStore } from '@reduxjs/toolkit';
import { selectionsSlice } from './selections';
import { mwcApi } from '~/api/query';

export const store = configureStore({
  reducer: {
    selections: selectionsSlice.reducer,
    [mwcApi.reducerPath]: mwcApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(mwcApi.middleware),
});

export type TRootState = ReturnType<typeof store.getState>;
export type TAppDispatch = typeof store.dispatch;
