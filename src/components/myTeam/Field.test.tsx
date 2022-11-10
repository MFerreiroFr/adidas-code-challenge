import React from 'react';
import { render, screen } from '@testing-library/react';
import { renderWithProviders } from '../../utils/testUtils';
import userEvent from '@testing-library/user-event';
import { setMyTeamInitialStateFieldPlayers } from '../../utils/preloadedStateUtils';
import { examplePlayer } from '../../utils/preloadedStateUtils';
import Field from './Field';

test('when you remove  a player from the field, it disappears from the field', () => {
  renderWithProviders(<Field />, {
    preloadedState: {
      myTeam: setMyTeamInitialStateFieldPlayers([examplePlayer]),
    },
  });
  const player = screen.getByText(examplePlayer.name);
  userEvent.click(player);
  const removeButton = screen.getByRole('button', { name: /remove/i });
  userEvent.click(removeButton);

  expect(
    screen.queryByTestId(`field-${examplePlayer.id}`)
  ).not.toBeInTheDocument();
});
