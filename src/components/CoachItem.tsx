import ListItem from './ListItem';
import { useTypedSelector } from '../hooks/use-typed-selector';
import { useActions } from '../hooks/use-actions';
import { Item } from '../interfaces/item.interface';
import { StyledButton } from '../styles/styledComponents/Buttons';
import { ActionButtonContainer } from '../styles/styledComponents/ActionButtonContainer';
import { addCoach } from '../state/reducers/myTeamSlice';
import { selectCoach } from '../state/reducers/playerSelectorSlice';

interface CoachItem {
  coach: Item;
}
const CoachItem: React.FC<CoachItem> = ({ coach }) => {
  const dispatch = useActions();
  const isCoachSelected = useTypedSelector(
    ({ playerSelector: { selectedCoachId } }) => selectedCoachId === coach.id
  );
  const coachHasTeam = useTypedSelector(
    ({ myTeam: { myTeamCoach } }) => myTeamCoach !== null
  );
  return (
    <>
      <ListItem
        item={coach}
        selected={isCoachSelected}
        onSelect={(id) => dispatch(selectCoach(id))}
        type='player'
        testId={`coach-${coach.id}`}
      />
      {isCoachSelected && (
        <ActionButtonContainer>
          <StyledButton
            color='success'
            onClick={() => dispatch(addCoach(coach))}
            disabled={coachHasTeam}
          >
            Select coach
          </StyledButton>
        </ActionButtonContainer>
      )}
    </>
  );
};

export default CoachItem;
