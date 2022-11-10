import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../utils/testUtils';
import userEvent from '@testing-library/user-event';
import { examplePlayer, exampleCoach } from '../utils/preloadedStateUtils';

import TeamBuilder from './TeamBuilder';

describe('perform actions on players from list', () => {
  test('when you add a player from the list to the field, the player appears on the field', async () => {
    renderWithProviders(<TeamBuilder />);

    const team = await screen.findByTestId('team-1');
    userEvent.click(team);

    const player = await screen.findByTestId(`player-${examplePlayer.id}`);
    userEvent.click(player);

    const addToFieldButton = screen.getByRole('button', {
      name: /Add to field/i,
    });
    userEvent.click(addToFieldButton);

    expect(screen.getByTestId(`field-${examplePlayer.id}`)).toBeVisible();
  });

  test('when you add a player from the list to the bench, the `player appears on the bench', async () => {
    renderWithProviders(<TeamBuilder />);

    const team = await screen.findByTestId('team-1');
    userEvent.click(team);

    const player = await screen.findByTestId(`player-${examplePlayer.id}`);
    userEvent.click(player);

    const addToBenchButton = screen.getByRole('button', {
      name: /Add to bench/i,
    });
    userEvent.click(addToBenchButton);

    expect(screen.getByTestId(`bench-${examplePlayer.id}`)).toBeVisible();
  });
});

test('when both action buttons are enabled, player is neither on the field or bench', async () => {
  renderWithProviders(<TeamBuilder />);

  const team = await screen.findByTestId('team-1');
  userEvent.click(team);

  const player = await screen.findByTestId(`player-${examplePlayer.id}`);
  userEvent.click(player);

  const addToFieldButton = screen.getByRole('button', {
    name: /Add to field/i,
  });
  const addToBenchButton = screen.getByRole('button', {
    name: /Add to bench/i,
  });

  expect(addToFieldButton).toBeEnabled();
  expect(addToBenchButton).toBeEnabled();

  expect(
    screen.queryByTestId(`field-${examplePlayer.id}`)
  ).not.toBeInTheDocument();
  expect(
    screen.queryByTestId(`bench-${examplePlayer.id}`)
  ).not.toBeInTheDocument();
});
test('when you add a coach, it appears in the coach column', async () => {
  renderWithProviders(<TeamBuilder />);

  const team = await screen.findByTestId('team-1');
  userEvent.click(team);

  const coach = await screen.findByTestId(`coach-${exampleCoach.id}`);
  userEvent.click(coach);

  const selectCoachButton = screen.getByRole('button', {
    name: /select coach/i,
  });
  userEvent.click(selectCoachButton);

  expect(screen.getByTestId(`myTeam-coach-${exampleCoach.id}`)).toBeVisible();
});

test('when you remove the coach, it disappears from the field', async () => {
  renderWithProviders(<TeamBuilder />);
  const team = await screen.findByTestId('team-1');
  userEvent.click(team);

  screen.debug();
  const coach = await screen.findByTestId(`coach-${exampleCoach.id}`);
  userEvent.click(coach);

  const selectCoachButton = screen.getByRole('button', {
    name: /select coach/i,
  });
  userEvent.click(selectCoachButton);

  const myTeamCoach = screen.getByTestId(`myTeam-coach-${exampleCoach.id}`);
  userEvent.click(myTeamCoach);

  const removeCoachButton = screen.getByRole('button', {
    name: /Remove/i,
  });
  userEvent.click(removeCoachButton);
  expect(
    screen.queryByTestId(`myTeam-coach-${exampleCoach.id}`)
  ).not.toBeInTheDocument();
});
//Mock until api calls are implemented
