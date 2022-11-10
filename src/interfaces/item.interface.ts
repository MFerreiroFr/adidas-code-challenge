import { selectedItemId } from '../types/types';
import { fieldPositions } from '../types/types';
export interface Item {
  name: string;
  id: number;
  src: string;
  testId?: string;
}

export interface PlayerItem extends Item {
  position: fieldPositions;
  teamId: selectedItemId;
}

export interface FieldPlayerRow {
  players: PlayerItem[];
  maxPlayers: number;
}

export interface fieldPlayers {
  goalkeeper: FieldPlayerRow;
  defenders: FieldPlayerRow;
  midfielders: FieldPlayerRow;
  forwards: FieldPlayerRow;
  selectedFieldPlayer: selectedItemId;
}

export interface MyTeamState {
  benchPlayers: FieldPlayerRow;
  selectedBenchPlayer: selectedItemId;
  fieldPlayers: FieldPlayerRow;
  selectedFieldPlayer: selectedItemId;
  myTeamCoach: Item | null;
  myTeamSelectedCoach: selectedItemId;
  maxPlayersByPosition: {
    gk: number;
    df: number;
    mf: number;
    fw: number;
  };
}

export interface coachInterface {
  name: string;
  id: number;
}
