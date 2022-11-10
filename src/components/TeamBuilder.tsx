import MyTeam from './myTeam/MyTeam';
import PlayerSelector from './playerSelector/PlayerSelector';
import CallToActionButton from './CallToActionButton';
import styled from 'styled-components';

const TeamBuilderContainer = styled.main`
  display: flex;
  justify-content: space-around;
  background-color: ${(props) => props.theme.colors.black};
`;

const TeamBuilderHeader = styled.header`
  display: flex;
  height: 150px;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  background-color: ${(props) => props.theme.colors.black};
  color: ${(props) => props.theme.colors.white};
`;
const HeaderLogo = styled.img`
  height: 100px;
  fill: ${(props) => props.theme.colors.white};
`;

const TeamBuilder: React.FC = () => {
  return (
    <>
      <TeamBuilderHeader>
        <HeaderLogo src='images/Logo.svg' />
        <h2>Adidas tech challenge: your adidas team</h2>
        <CallToActionButton />
      </TeamBuilderHeader>
      <TeamBuilderContainer>
        <PlayerSelector />
        <MyTeam />
      </TeamBuilderContainer>
    </>
  );
};

export default TeamBuilder;
