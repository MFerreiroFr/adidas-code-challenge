import { MyTeamState } from '../../../interfaces/item.interface';

export const myTeamInitialState: MyTeamState = {
  benchPlayers: {
    players: [],
    maxPlayers: 5,
  },
  selectedBenchPlayer: null,
  selectedFieldPlayer: null,
  fieldPlayers: {
    players: [],
    maxPlayers: 11,
  },
  myTeamCoach: null,
  myTeamSelectedCoach: null,
  maxPlayersByPosition: {
    gk: 1,
    df: 4,
    mf: 4,
    fw: 2,
  },
};
