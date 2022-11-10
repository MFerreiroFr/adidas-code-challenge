import { useTypedSelector } from './use-typed-selector';
import { PlayerItem } from '../interfaces/item.interface';

export const useIsPlayerOnField = (player: PlayerItem): boolean => {
  const fieldPlayers = useTypedSelector(
    ({ myTeam: { fieldPlayers } }) => fieldPlayers
  );

  return fieldPlayers.players.some(
    (fieldPlayer) => fieldPlayer?.id === player.id
  );
};
