import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../utils/testUtils';
import userEvent from '@testing-library/user-event';
import {
  exampleCoach,
  setMyTeamInitialStateCoach,
} from '../utils/preloadedStateUtils';

import CoachItem from './CoachItem';

test('when a coach is selected the select coach button appears', () => {
  renderWithProviders(<CoachItem coach={exampleCoach} />);
  const coach = screen.getByText(exampleCoach.name);
  userEvent.click(coach);

  const selectCoachButton = screen.getByRole('button', {
    name: /select coach/i,
  });
  expect(selectCoachButton).toBeVisible();
});

test('when a coach is already selected for the team, the select coach button is disabled', () => {
  renderWithProviders(<CoachItem coach={exampleCoach} />, {
    preloadedState: { myTeam: setMyTeamInitialStateCoach(exampleCoach) },
  });
  const coach = screen.getByText(exampleCoach.name);
  userEvent.click(coach);

  const selectCoachButton = screen.getByRole('button', {
    name: /select coach/i,
  });
  expect(selectCoachButton).toBeDisabled();
});
