import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { selectedItemId } from '../../types/types';

interface PlayerSelectorState {
  selectedTeamId: selectedItemId;
  selectedPlayerId: selectedItemId;
  selectedCoachId: selectedItemId;
}

const initialState: PlayerSelectorState = {
  selectedTeamId: null,
  selectedPlayerId: null,
  selectedCoachId: null,
};

export const teamSlice = createSlice({
  name: 'playerSelector',
  initialState,
  reducers: {
    selectTeam: (state, action: PayloadAction<number>) => {
      state.selectedTeamId = action.payload;
    },
    selectPlayer: (state, action: PayloadAction<number>) => {
      state.selectedPlayerId = action.payload;
    },
    selectCoach: (state, action: PayloadAction<number>) => {
      state.selectedCoachId = action.payload;
    },
  },
});

export const { selectTeam, selectPlayer, selectCoach } = teamSlice.actions;
export default teamSlice.reducer;
