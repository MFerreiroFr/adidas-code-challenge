import ListItem from '../ListItem';
import { useTypedSelector } from '../../hooks/use-typed-selector';
import { useActions } from '../../hooks/use-actions';
import { Item } from '../../interfaces/item.interface';
import { StyledButton } from '../../styles/styledComponents/Buttons';
import { ActionButtonContainer } from '../../styles/styledComponents/ActionButtonContainer';
import {
  removeCoach,
  selectMyTeamCoach,
} from '../../state/reducers/myTeamSlice';

interface CoachItem {
  coach: Item;
}
const MyTeamCoachItem: React.FC<CoachItem> = ({ coach }) => {
  const dispatch = useActions();
  const isCoachSelected = useTypedSelector(
    ({ myTeam: { myTeamSelectedCoach } }) => myTeamSelectedCoach === coach.id
  );

  return (
    <>
      <ListItem
        item={coach}
        selected={isCoachSelected}
        onSelect={(id) => dispatch(selectMyTeamCoach(id))}
        type='player'
        testId={`myTeam-coach-${coach.id}`}
      />
      {isCoachSelected && (
        <ActionButtonContainer>
          <StyledButton
            color='error'
            onClick={() => dispatch(removeCoach(coach))}
          >
            Remove
          </StyledButton>
        </ActionButtonContainer>
      )}
    </>
  );
};

export default MyTeamCoachItem;
