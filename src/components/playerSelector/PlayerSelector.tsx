import { useState, useEffect } from 'react';
import { parseTeams, parsePlayers, parseCoach } from '../../utils/utils';

import { Item, PlayerItem } from '../../interfaces/item.interface';
import { selectedItemId } from '../../types/types';
import ListItem from '../ListItem';
import CoachItem from '../CoachItem';
import { useTypedSelector } from '../../hooks/use-typed-selector';
import { useActions } from '../../hooks/use-actions';
import { selectTeam } from '../../state/reducers/playerSelectorSlice';
import {
  useGetCoachQuery,
  useGetTeamPlayersQuery,
  useGetTeamsQuery,
} from '../../state/api/apiSlice';
import PlayerListItem from '../PlayerItem';
import styled from 'styled-components';
import { ListTitle } from '../../styles/styledComponents/ListTitle';
import Loading from './Loading';

const PlayerSelector: React.FC = () => {
  const [teams, setTeams] = useState<Item[]>([]);
  const [players, setPlayers] = useState<PlayerItem[]>([]);
  const [coach, setCoach] = useState<Item | null>(null);
  const [skipPlayersQuery, setSkipPlayersQuery] = useState(true);
  const [skipCoachQuery, setSkipCoachQuery] = useState(true);
  const selectedTeam = useTypedSelector(
    ({ playerSelector: { selectedTeamId } }) => selectedTeamId
  );

  const { data: teamsData, isLoading: isGetTeamsLoading } = useGetTeamsQuery();
  const { data: playersData, isLoading: isGetTeamPlayersLoading } =
    useGetTeamPlayersQuery(selectedTeam as number, {
      skip: skipPlayersQuery,
    });
  const { data: coachData, isLoading: isGetCoachLoading } = useGetCoachQuery(
    selectedTeam,
    {
      skip: skipCoachQuery,
    }
  );
  const dispatch = useActions();

  useEffect(() => {
    if (teamsData) {
      const parsedTeams = parseTeams(teamsData.response);
      setTeams(parsedTeams);
    }
  }, [teamsData]);

  useEffect(() => {
    if (selectedTeam !== null) {
      setSkipPlayersQuery(false);
      setSkipCoachQuery(false);
    }
  }, [selectedTeam]);

  useEffect(() => {
    if (playersData) {
      const parsedPlayers = parsePlayers(
        playersData.response[0].players,
        selectedTeam
      );
      setPlayers(parsedPlayers);
    }
  }, [playersData]);

  useEffect(() => {
    if (coachData) {
      const parsedCoach = parseCoach(coachData.response[0]);
      setCoach(parsedCoach);
    }
  }, [coachData]);

  const setSelectedTeam = (id: number) => {
    dispatch(selectTeam(id));
  };

  const renderTeams = (
    parsedItemList: Item[],
    handleSelect: (id: number) => void,
    selectedId: selectedItemId
  ) =>
    parsedItemList.map((item: Item) => (
      <ListItem
        key={item.id}
        item={item}
        onSelect={handleSelect}
        selected={selectedId === item.id}
        type='team'
        testId={`team-${item.id}`}
      />
    ));

  const renderPlayers = (parsedPlayerList: PlayerItem[]) =>
    parsedPlayerList.map((player: PlayerItem) => (
      <PlayerListItem key={player.id} player={player} />
    ));

  return (
    <PlayerSelectorContainer>
      <Loading isLoading={isGetTeamsLoading}>
        <SelectorContainer id='teams'>
          <ListTitle>TEAMS</ListTitle>
          {renderTeams(teams, setSelectedTeam, selectedTeam)}
        </SelectorContainer>
      </Loading>
      {selectedTeam && (
        <Loading isLoading={isGetTeamPlayersLoading}>
          <SelectorContainer id='players'>
            <ListTitle>COACH</ListTitle>
            <Loading isLoading={isGetCoachLoading}>
              {coach && <CoachItem coach={coach} />}
            </Loading>
            <ListTitle>PLAYERS</ListTitle>
            {renderPlayers(players)}
          </SelectorContainer>
        </Loading>
      )}
    </PlayerSelectorContainer>
  );
};

export default PlayerSelector;

const PlayerSelectorContainer = styled.div`
  display: flex;
`;

const SelectorContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 8px 16px;
`;
