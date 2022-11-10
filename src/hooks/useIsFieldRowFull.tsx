import { useTypedSelector } from './use-typed-selector';
import { fieldPositions } from '../types/types';

export const useIsFieldRowFull = (position: fieldPositions) => {
  const fieldPlayers = useTypedSelector(
    ({ myTeam: { fieldPlayers } }) => fieldPlayers
  );
  const maxPlayers = useTypedSelector(
    ({ myTeam: { maxPlayersByPosition } }) =>
      maxPlayersByPosition[position as keyof typeof maxPlayersByPosition]
  );

  return (
    fieldPlayers.players.filter((player) => player.position === position)
      .length >= maxPlayers
  );
};
