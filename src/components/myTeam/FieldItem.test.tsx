import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../utils/testUtils';
import userEvent from '@testing-library/user-event';
import {
  setMyTeamInitialStateBenchPlayers,
  setMyTeamInitialStateFieldPlayers,
} from '../../utils/preloadedStateUtils';
import { examplePlayer } from '../../utils/preloadedStateUtils';

import FieldItem from './FieldItem';

test('when you click on the field player, the action buttons appear on screen', () => {
  renderWithProviders(<FieldItem player={examplePlayer} />);
  const player = screen.getByText(examplePlayer.name);
  userEvent.click(player);
  const removeButton = screen.getByRole('button', { name: /remove/i });
  const benchButton = screen.getByRole('button', {
    name: /bench/i,
  });

  expect(removeButton).toBeVisible();
  expect(benchButton).toBeVisible();
});

test('when bench is full, bench button is disabled', () => {
  renderWithProviders(<FieldItem player={examplePlayer} />, {
    preloadedState: {
      myTeam: setMyTeamInitialStateBenchPlayers([
        examplePlayer,
        examplePlayer,
        examplePlayer,
        examplePlayer,
        examplePlayer,
      ]),
    },
  });
  const player = screen.getByText(examplePlayer.name);
  userEvent.click(player);
  const benchButton = screen.getByRole('button', {
    name: /bench/i,
  });

  expect(benchButton).toBeDisabled();
});
