import { useTypedSelector } from '../../hooks/use-typed-selector';
import { PlayerItem } from '../../interfaces/item.interface';
import MyTeamCoachItem from './MyTeamCoachItem';
import BenchPlayerItem from './BenchPlayerItem';
import styled from 'styled-components';
import { ListTitle } from '../../styles/styledComponents/ListTitle';

const BenchPlayerList: React.FC = () => {
  const benchPlayersList = useTypedSelector(
    ({ myTeam: { benchPlayers } }) => benchPlayers.players
  );

  const myTeamCoach = useTypedSelector(
    ({ myTeam: { myTeamCoach } }) => myTeamCoach
  );

  const renderPlayers = (playerList: PlayerItem[]) => {
    return playerList.map((player) => (
      <BenchPlayerItem key={player.id} player={player} />
    ));
  };
  return (
    <div>
      <BenchPlayerListContainer>
        <ListTitle>Bench players:</ListTitle>
        {renderPlayers(benchPlayersList)}
      </BenchPlayerListContainer>

      <BenchPlayerListContainer>
        <ListTitle> Coach:</ListTitle>
        {myTeamCoach ? (
          <MyTeamCoachItem coach={myTeamCoach} />
        ) : (
          <ListTitle>No coach selected</ListTitle>
        )}
      </BenchPlayerListContainer>
    </div>
  );
};

export default BenchPlayerList;

const BenchPlayerListContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
`;
