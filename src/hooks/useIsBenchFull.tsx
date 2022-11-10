import { useTypedSelector } from './use-typed-selector';

export const useIsBenchFull = () => {
  const bench = useTypedSelector(
    ({ myTeam: { benchPlayers } }) => benchPlayers
  );

  return bench.players.length >= bench.maxPlayers;
};
