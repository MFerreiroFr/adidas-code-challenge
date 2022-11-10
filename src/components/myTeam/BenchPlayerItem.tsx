import { PlayerItem } from '../../interfaces/item.interface';
import ListItem from '../ListItem';
import { useTypedSelector } from '../../hooks/use-typed-selector';
import { useActions } from '../../hooks/use-actions';
import { useIsFieldRowFull } from '../../hooks/useIsFieldRowFull';
import { ActionButton } from '../../styles/styledComponents/Buttons';
import { ActionButtonContainer } from '../../styles/styledComponents/ActionButtonContainer';
import {
  removeFromBench,
  selectBenchPlayer,
  addToField,
} from '../../state/reducers/myTeamSlice';

interface PlayerItemProps {
  player: PlayerItem;
}
const BenchPlayerItem: React.FC<PlayerItemProps> = ({ player }) => {
  const dispatch = useActions();
  const isFieldRoWFull = useIsFieldRowFull(player.position);
  const isBenchPlayerSelected = useTypedSelector(
    ({ myTeam: { selectedBenchPlayer } }) => selectedBenchPlayer === player.id
  );

  const movePlayerToField = (player: PlayerItem): void => {
    dispatch(removeFromBench(player));
    dispatch(addToField(player));
  };

  return (
    <>
      <ListItem
        item={player}
        selected={isBenchPlayerSelected}
        onSelect={(id) => dispatch(selectBenchPlayer(id))}
        type='player'
        testId={`bench-${player.id}`}
      />
      {isBenchPlayerSelected && (
        <ActionButtonContainer>
          <ActionButton
            color='success'
            onClick={() => movePlayerToField(player)}
            disabled={isFieldRoWFull}
          >
            Move to field
          </ActionButton>
          <ActionButton
            color='error'
            onClick={() => dispatch(removeFromBench(player))}
          >
            Remove
          </ActionButton>
        </ActionButtonContainer>
      )}
    </>
  );
};

export default BenchPlayerItem;
