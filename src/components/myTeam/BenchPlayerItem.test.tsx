import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../utils/testUtils';
import userEvent from '@testing-library/user-event';
import {
  setMyTeamInitialStateBenchPlayers,
  setMyTeamInitialStateFieldPlayers,
} from '../../utils/preloadedStateUtils';
import { examplePlayer } from '../../utils/preloadedStateUtils';

import BenchPlayerItem from './BenchPlayerItem';

test('when you click on the becnh player, the action buttons appear on screen', () => {
  renderWithProviders(<BenchPlayerItem player={examplePlayer} />);
  const player = screen.getByText(examplePlayer.name);
  userEvent.click(player);
  const removeButton = screen.getByRole('button', { name: /remove/i });
  const moveToFieldButton = screen.getByRole('button', {
    name: /move to field/i,
  });

  expect(removeButton).toBeVisible();
  expect(moveToFieldButton).toBeVisible();
});

test('when max players of the same position are on the field, move to field button of same position player is disabled', () => {
  renderWithProviders(<BenchPlayerItem player={examplePlayer} />, {
    preloadedState: {
      myTeam: setMyTeamInitialStateFieldPlayers([examplePlayer]),
    },
  });
  const player = screen.getByText(examplePlayer.name);
  userEvent.click(player);
  const moveToFieldButton = screen.getByRole('button', {
    name: /move to field/i,
  });

  expect(moveToFieldButton).toBeDisabled();
});
