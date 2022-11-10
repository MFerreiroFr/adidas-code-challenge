import { useTypedSelector } from '../../hooks/use-typed-selector';
import { PlayerItem } from '../../interfaces/item.interface';
import { FieldItemImageContainer } from '../../styles/styledComponents/ListItemImageContainer';
import { useActions } from '../../hooks/use-actions';
import { ActionButton } from '../../styles/styledComponents/Buttons';
import { ActionButtonContainer } from '../../styles/styledComponents/ActionButtonContainer';
import {
  removeFromField,
  addToBench,
  selectFieldPlayer,
} from '../../state/reducers/myTeamSlice';
import styled from 'styled-components';

interface FieldItemProps {
  player: PlayerItem;
}

const FieldItem: React.FC<FieldItemProps> = ({ player }) => {
  const { src, name, position } = player;
  const dispatch = useActions();
  const isSelectedPlayer = useTypedSelector(
    ({ myTeam: { selectedFieldPlayer } }) => selectedFieldPlayer === player.id
  );

  const isBenchFull = useTypedSelector(
    ({ myTeam: { benchPlayers } }) =>
      benchPlayers.players.length >= benchPlayers.maxPlayers
  );

  const movePlayerToBench = (player: PlayerItem): void => {
    dispatch(removeFromField(player));
    dispatch(addToBench(player));
  };
  return (
    <FieldItemContainer
      data-testid={`field-${player.id}`}
      onClick={() => dispatch(selectFieldPlayer(player.id))}
    >
      <FieldItemImageContainer src={src} type='player' />
      <p>{name}</p>
      {isSelectedPlayer && (
        <ActionButtonContainer>
          <ActionButton
            color='error'
            onClick={() => dispatch(removeFromField(player))}
          >
            Remove
          </ActionButton>
          <ActionButton
            color='action'
            disabled={isBenchFull}
            onClick={() => movePlayerToBench(player)}
          >
            Bench
          </ActionButton>
        </ActionButtonContainer>
      )}
    </FieldItemContainer>
  );
};

export default FieldItem;

const FieldItemContainer = styled.div`
  height: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  min-width: 120px;
`;
