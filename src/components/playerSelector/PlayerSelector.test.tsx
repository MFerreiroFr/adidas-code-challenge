import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../utils/testUtils';

import PlayerSelector from './PlayerSelector';

test('teams section appears on screen', async () => {
  renderWithProviders(<PlayerSelector />);
  const teams = await screen.findByText(/teams/i);
  expect(teams).toBeVisible();
});

test('players section appear when you click on a team', async () => {
  renderWithProviders(<PlayerSelector />);
  const team = await screen.findByTestId('team-1');
  userEvent.click(team);
  const playersHeader = await screen.findByText(/players/i);
  expect(playersHeader).toBeVisible();
});

//TODO: API tests for players and teams.
