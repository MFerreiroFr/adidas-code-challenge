import { PlayerItem } from '../interfaces/item.interface';
import ListItem from './ListItem';
import { useTypedSelector } from '../hooks/use-typed-selector';
import { useActions } from '../hooks/use-actions';
import { selectPlayer } from '../state/reducers/playerSelectorSlice';
import { useIsPlayerOnField } from '../hooks/useIsPlayerOnField';
import { useIsFieldRowFull } from '../hooks/useIsFieldRowFull';
import { useIsBenchFull } from '../hooks/useIsBenchFull';
import { addToBench, addToField } from '../state/reducers/myTeamSlice';
import styled from 'styled-components';
import { ActionButton } from '../styles/styledComponents/Buttons';
import { selectedItemId } from '../types/types';

interface PlayerListItemProps {
  player: PlayerItem;
}

const PlayerListItem: React.FC<PlayerListItemProps> = ({ player }) => {
  const dispatch = useActions();
  const isFieldRowFull = useIsFieldRowFull(player.position);
  const isBenchFull = useIsBenchFull();
  const isPlayerOnField = useIsPlayerOnField(player);
  const selectedPlayer = useTypedSelector(
    ({ playerSelector: { selectedPlayerId } }) => selectedPlayerId
  );

  const benchPlayers = useTypedSelector(
    ({ myTeam: { benchPlayers } }) => benchPlayers
  );

  const fieldPlayers = useTypedSelector(
    ({ myTeam: { fieldPlayers } }) => fieldPlayers
  );

  const maxPlayersByTeam = (
    field: PlayerItem[],
    bench: PlayerItem[],
    team: selectedItemId
  ): boolean => {
    if (!team) return false;
    return (
      [...field, ...bench].filter((player) => player.teamId === team).length ===
      4
    );
  };
  const isPlayerOnBench = (
    player: PlayerItem,
    benchPlayers: PlayerItem[]
  ): boolean =>
    benchPlayers.some((benchPlayer) => benchPlayer.id === player.id);

  const selected = selectedPlayer === player.id;
  const isOnMyTeam =
    isPlayerOnBench(player, benchPlayers.players) || isPlayerOnField;

  const addPlayerToBench = (player: PlayerItem): void => {
    if (isOnMyTeam) return;
    dispatch(addToBench(player));
  };

  return (
    <>
      <PlayerListItemContainer>
        <ListItem
          item={player}
          selected={selected}
          onSelect={(id) => dispatch(selectPlayer(id))}
          type='player'
          testId={`player-${player.id}`}
        />
        <PlayerPositionContainer position={player.position}>
          <p>{player.position}</p>
        </PlayerPositionContainer>
      </PlayerListItemContainer>
      {selected && (
        <PlayerActionButtonContainer>
          <ActionButton
            color='success'
            onClick={() => dispatch(addToField(player))}
            disabled={
              isFieldRowFull ||
              isOnMyTeam ||
              maxPlayersByTeam(
                fieldPlayers.players,
                benchPlayers.players,
                player.teamId
              )
            }
          >
            Add to field
          </ActionButton>
          <ActionButton
            color='action'
            onClick={() => addPlayerToBench(player)}
            disabled={
              isBenchFull ||
              isOnMyTeam ||
              maxPlayersByTeam(
                fieldPlayers.players,
                benchPlayers.players,
                player.teamId
              )
            }
          >
            Add to bench
          </ActionButton>
        </PlayerActionButtonContainer>
      )}
    </>
  );
};

export default PlayerListItem;

const PlayerListItemContainer = styled.div`
  display: flex;
  align-items: center;
`;

interface PlayerPositionContainerProps {
  position: string;
}
const PlayerPositionContainer = styled.div<PlayerPositionContainerProps>`
  display: flex;
  height: 30px;
  width: 25px;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.colors[props.position]};
  color: ${(props) => props.theme.colors.white};
  text-transform: uppercase;
`;

const PlayerActionButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
