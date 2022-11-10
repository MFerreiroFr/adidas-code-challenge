import styled from 'styled-components';
import { PlayerItem } from '../../interfaces/item.interface';
import FieldItem from './FieldItem';

interface PlayersRowProps {
  playerRow: PlayerItem[];
}

const PlayersRow: React.FC<PlayersRowProps> = ({ playerRow }) => {
  const renderPlayerRow = (playerRow: PlayerItem[]) => {
    return playerRow.map((player: PlayerItem) => {
      return <FieldItem key={player.id} player={player} />;
    });
  };
  return <PlayerRowContainer>{renderPlayerRow(playerRow)}</PlayerRowContainer>;
};

export default PlayersRow;

const PlayerRowContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 150px;
`;
