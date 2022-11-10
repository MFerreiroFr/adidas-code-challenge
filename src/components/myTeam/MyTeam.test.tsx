import React from 'react';
import { render, screen } from '@testing-library/react';
import { renderWithProviders } from '../../utils/testUtils';
import userEvent from '@testing-library/user-event';
import {
  setMyTeamInitialStateBenchPlayers,
  setMyTeamInitialStateFieldPlayers,
} from '../../utils/preloadedStateUtils';
import { examplePlayer } from '../../utils/preloadedStateUtils';
import MyTeam from './MyTeam';

test('when you bench a player in the field, it disappears from the field and appears in the bench', () => {
  renderWithProviders(<MyTeam />, {
    preloadedState: {
      myTeam: setMyTeamInitialStateFieldPlayers([examplePlayer]),
    },
  });
  const player = screen.getByTestId(`field-${examplePlayer.id}`);
  // screen.getByText(examplePlayer.name);
  userEvent.click(player);
  const benchButton = screen.getByRole('button', { name: /bench/i });
  userEvent.click(benchButton);

  expect(
    screen.queryByTestId(`field-${examplePlayer.id}`)
  ).not.toBeInTheDocument();
  expect(screen.getByTestId(`bench-${examplePlayer.id}`)).toBeVisible();
});

test('when you move a player from the bench, it disappears from the bench and appears on the field', () => {
  renderWithProviders(<MyTeam />, {
    preloadedState: {
      myTeam: setMyTeamInitialStateBenchPlayers([examplePlayer]),
    },
  });
  const player = screen.getByTestId(`bench-${examplePlayer.id}`);
  userEvent.click(player);
  const moveToFieldButton = screen.getByRole('button', {
    name: /move to field/i,
  });
  userEvent.click(moveToFieldButton);

  expect(
    screen.queryByTestId(`bench-${examplePlayer.id}`)
  ).not.toBeInTheDocument();
  expect(screen.getByTestId(`field-${examplePlayer.id}`)).toBeVisible();
});
