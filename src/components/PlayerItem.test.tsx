import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../utils/testUtils';
import userEvent from '@testing-library/user-event';

import PlayerItem from './PlayerItem';
import { PlayerItem as PlayerItemInterface } from '../interfaces/item.interface';

// initial State functions
import {
  setMyTeamInitialStateBenchPlayers,
  setMyTeamInitialStateFieldPlayers,
} from '../utils/preloadedStateUtils';

test('When you click on a player, you see the action buttons', () => {
  renderWithProviders(<PlayerItem player={playerProp} />);
  const playerBox = screen.getByText(playerProp.name);
  userEvent.click(playerBox);
  const addToBenchButton = screen.getByRole('button', {
    name: /Add to bench/i,
  });
  const addToFieldButton = screen.getByRole('button', {
    name: /Add to field/i,
  });

  expect(addToBenchButton).toBeVisible();
  expect(addToFieldButton).toBeVisible();
});

test('When a player is already on the field, action buttons disable', () => {
  renderWithProviders(<PlayerItem player={playerProp} />, {
    preloadedState: {
      myTeam: setMyTeamInitialStateFieldPlayers([playerProp]),
    },
  });
  const playerBox = screen.getByText(playerProp.name);
  userEvent.click(playerBox);
  const addToFieldButton = screen.getByRole('button', {
    name: /Add to field/i,
  });
  const addToBenchButton = screen.getByRole('button', {
    name: /Add to bench/i,
  });
  expect(addToFieldButton).toBeDisabled();
  expect(addToBenchButton).toBeDisabled();
});

test('When a player is already on the bench, action buttons disable', () => {
  renderWithProviders(<PlayerItem player={playerProp} />, {
    preloadedState: {
      myTeam: setMyTeamInitialStateBenchPlayers([playerProp]),
    },
  });

  const playerBox = screen.getByText(playerProp.name);
  userEvent.click(playerBox);
  const addToFieldButton = screen.getByRole('button', {
    name: /Add to field/i,
  });
  const addToBenchButton = screen.getByRole('button', {
    name: /Add to bench/i,
  });
  expect(addToFieldButton).toBeDisabled();
  expect(addToBenchButton).toBeDisabled();
});

test('when bench is full, add to bench button is disabled', () => {
  renderWithProviders(<PlayerItem player={playerProp} />, {
    preloadedState: {
      myTeam: setMyTeamInitialStateBenchPlayers([
        differentPositionPlayerProp,
        differentPositionPlayerProp,
        differentPositionPlayerProp,
        differentPositionPlayerProp,
        differentPositionPlayerProp,
      ]),
    },
  });

  const playerBox = screen.getByText(playerProp.name);
  userEvent.click(playerBox);
  const addToFieldButton = screen.getByRole('button', {
    name: /Add to field/i,
  });
  const addToBenchButton = screen.getByRole('button', {
    name: /Add to bench/i,
  });
  expect(addToFieldButton).toBeEnabled();
  expect(addToBenchButton).toBeDisabled();
});

test('When max players in position are in field, add to field button is disabled', () => {
  renderWithProviders(<PlayerItem player={playerProp} />, {
    preloadedState: {
      myTeam: setMyTeamInitialStateFieldPlayers([samePositionPlayerProp]),
    },
  });
  const playerBox = screen.getByText(playerProp.name);
  userEvent.click(playerBox);
  const addToFieldButton = screen.getByRole('button', {
    name: /Add to field/i,
  });
  const addToBenchButton = screen.getByRole('button', {
    name: /Add to bench/i,
  });
  expect(addToFieldButton).toBeDisabled();
  expect(addToBenchButton).toBeEnabled();
});

test('when there are 4 players on my team from the same team as the selected player, action buttons are disabled', () => {
  renderWithProviders(<PlayerItem player={playerProp} />, {
    preloadedState: {
      myTeam: setMyTeamInitialStateFieldPlayers(
        [
          differentPositionPlayerProp,
          differentPositionPlayerProp,
          differentPositionPlayerProp,
        ],
        setMyTeamInitialStateBenchPlayers([samePositionPlayerProp])
      ),
    },
  });
  const playerBox = screen.getByText(playerProp.name);
  userEvent.click(playerBox);
  const addToFieldButton = screen.getByRole('button', {
    name: /Add to field/i,
  });
  const addToBenchButton = screen.getByRole('button', {
    name: /Add to bench/i,
  });
  expect(addToFieldButton).toBeDisabled();
  expect(addToBenchButton).toBeDisabled();
});
// Props

const playerProp: PlayerItemInterface = {
  id: 2918,
  name: 'K. Casteels',
  src: 'https://media.api-sports.io/football/players/2918.png',
  position: 'gk',
  teamId: 1,
};

const differentPositionPlayerProp: PlayerItemInterface = {
  id: 1108,
  name: 'D. Boyata',
  src: 'https://media.api-sports.io/football/players/1108.png',
  position: 'df',
  teamId: 1,
};

const samePositionPlayerProp: PlayerItemInterface = {
  id: 730,
  name: 'T. Courtois',
  src: 'https://media.api-sports.io/football/players/730.png',
  position: 'gk',
  teamId: 1,
};
