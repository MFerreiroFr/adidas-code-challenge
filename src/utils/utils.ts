import { Item, PlayerItem } from '../interfaces/item.interface';
import { fieldPositions, selectedItemId } from '../types/types';

interface RawTeam {
  team: {
    name: string;
    id: number;
  };
}

interface RawCoach {
  name: string;
  id: number;
  photo: string;
}

interface RawPlayer {
  id: number;
  name: string;
  photo: string;
  position: string;
}

export const parseTeams = (teams: RawTeam[]): Item[] => {
  return teams.map((mappedTeam) => {
    const { team } = mappedTeam;
    return {
      name: team.name,
      id: team.id,
      src: `flags/${getFlagName(team.name)}.svg`,
    };
  });
};

export const parsePlayers = (
  players: RawPlayer[],
  teamId: selectedItemId
): PlayerItem[] => {
  return players.map((player) => {
    return {
      id: player.id,
      name: player.name,
      src: player.photo,
      position: abbreviatePlayerPosition(player.position),
      teamId,
    };
  });
};

const getFlagName = (name: string): string =>
  name.replace(' ', '-').toLowerCase();

const abbreviatePlayerPosition = (position: string): fieldPositions => {
  switch (position.toLowerCase()) {
    case 'goalkeeper':
      return 'gk';
    case 'defender':
      return 'df';
    case 'midfielder':
      return 'mf';
    case 'attacker':
      return 'fw';
    default:
      return 'np';
  }
};

export const parseCoach = (coach: RawCoach): Item => {
  return {
    id: coach.id,
    name: coach.name,
    src: coach.photo,
  };
};
