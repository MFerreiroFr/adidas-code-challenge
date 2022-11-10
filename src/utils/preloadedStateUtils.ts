import { Item, PlayerItem } from '../interfaces/item.interface';
import { myTeamInitialState } from '../state/reducers/initialStates/myTeamInitialState';

export const setMyTeamInitialStateBenchPlayers = (
  benchPlayers: PlayerItem[],
  initialState = myTeamInitialState
) => {
  return {
    ...initialState,
    benchPlayers: { ...initialState.benchPlayers, players: benchPlayers },
  };
};

export const setMyTeamInitialStateFieldPlayers = (
  fieldPlayers: PlayerItem[],
  initialState = myTeamInitialState
) => {
  return {
    ...initialState,
    fieldPlayers: { ...initialState.fieldPlayers, players: fieldPlayers },
  };
};

export const setMyTeamInitialStateCoach = (
  coach: Item,
  initialState = myTeamInitialState
) => {
  return {
    ...initialState,
    myTeamCoach: coach,
  };
};

export const examplePlayer: PlayerItem = {
  id: 2918,
  name: 'K. Casteels',
  src: 'https://media.api-sports.io/football/players/2918.png',
  position: 'gk',
  teamId: 1,
};

export const exampleCoach = {
  id: 115,
  name: 'Z. Dalić',
  src: 'https://media.api-sports.io/football/coachs/115.png',
};
