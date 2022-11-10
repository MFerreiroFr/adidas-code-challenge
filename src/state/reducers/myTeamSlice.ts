import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { PlayerItem, FieldPlayerRow } from '../../interfaces/item.interface';
import { selectedItemId } from '../../types/types';
import { MyTeamState, Item } from '../../interfaces/item.interface';
import { myTeamInitialState } from './initialStates/myTeamInitialState';

const initialState: MyTeamState = myTeamInitialState;

export const teamSlice = createSlice({
  name: 'myTeam',
  initialState,
  reducers: {
    addToField: (state, action: PayloadAction<PlayerItem>) => {
      state.fieldPlayers.players.push(action.payload);
    },
    addToBench: (state, action: PayloadAction<PlayerItem>) => {
      state.benchPlayers.players.push(action.payload);
    },
    removeFromBench: (state, action: PayloadAction<PlayerItem>) => {
      const updatedBenchPlayerList = state.benchPlayers.players.filter(
        (benchPlayer) => benchPlayer.id !== action.payload.id
      );
      state.benchPlayers.players = updatedBenchPlayerList;
    },
    removeFromField: (state, action: PayloadAction<PlayerItem>) => {
      const updatedFieldPlayerList = state.fieldPlayers.players.filter(
        (fieldPlayer) => fieldPlayer.id !== action.payload.id
      );
      state.fieldPlayers.players = updatedFieldPlayerList;
    },
    selectFieldPlayer: (state, action: PayloadAction<number>) => {
      state.selectedFieldPlayer = action.payload;
    },
    selectBenchPlayer: (state, action: PayloadAction<number>) => {
      state.selectedBenchPlayer = action.payload;
    },
    addCoach: (state, action: PayloadAction<Item>) => {
      state.myTeamCoach = action.payload;
    },
    removeCoach: (state, action: PayloadAction<Item>) => {
      state.myTeamCoach = null;
    },
    selectMyTeamCoach: (state, action: PayloadAction<number>) => {
      state.myTeamSelectedCoach = action.payload;
    },
  },
});

export const {
  addToBench,
  addToField,
  removeFromBench,
  removeFromField,
  selectBenchPlayer,
  selectFieldPlayer,
  addCoach,
  removeCoach,
  selectMyTeamCoach,
} = teamSlice.actions;
export default teamSlice.reducer;
