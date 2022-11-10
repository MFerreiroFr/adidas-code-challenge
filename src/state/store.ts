import { combineReducers, configureStore } from '@reduxjs/toolkit';
import type { PreloadedState } from '@reduxjs/toolkit';
import playerSelectorReducer from './reducers/playerSelectorSlice';
import myTeamReducer from './reducers/myTeamSlice';
import { apiSlice } from './api/apiSlice';

const rootReducer = combineReducers({
  playerSelector: playerSelectorReducer,
  myTeam: myTeamReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});
export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
  });
};

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch'];
