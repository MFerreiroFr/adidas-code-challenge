import styled from 'styled-components';
import { useTypedSelector } from '../../hooks/use-typed-selector';
import { PlayerItem } from '../../interfaces/item.interface';
import PlayersRow from './PlayersRow';

const Field: React.FC = () => {
  const goalkeeperRow = useTypedSelector(({ myTeam: { fieldPlayers } }) =>
    fieldPlayers.players.filter(
      (player: PlayerItem) => player.position === 'gk'
    )
  );
  const defendersRow = useTypedSelector(({ myTeam: { fieldPlayers } }) =>
    fieldPlayers.players.filter(
      (player: PlayerItem) => player.position === 'df'
    )
  );
  const midfieldersRow = useTypedSelector(({ myTeam: { fieldPlayers } }) =>
    fieldPlayers.players.filter(
      (player: PlayerItem) => player.position === 'mf'
    )
  );
  const forwardsRow = useTypedSelector(({ myTeam: { fieldPlayers } }) =>
    fieldPlayers.players.filter((player) => player.position === 'fw')
  );
  return (
    <FieldContainer id='field'>
      <PlayersRow playerRow={goalkeeperRow} />
      <PlayersRow playerRow={defendersRow} />
      <PlayersRow playerRow={midfieldersRow} />
      <PlayersRow playerRow={forwardsRow} />
    </FieldContainer>
  );
};

export default Field;

const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
  height: 700px;
  justify-content: space-between;
  background-image: url('/images/field.svg');
  background-size: cover;
  padding: 16px 8px;
  margin: 16px 0;
`;
