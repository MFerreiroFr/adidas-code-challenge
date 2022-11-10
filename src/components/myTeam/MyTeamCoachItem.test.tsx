import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../utils/testUtils';
import userEvent from '@testing-library/user-event';
import { exampleCoach } from '../../utils/preloadedStateUtils';

import MyTeamCoachItem from './MyTeamCoachItem';

test('when a coach is selected the remove button appears', () => {
  renderWithProviders(<MyTeamCoachItem coach={exampleCoach} />);
  const coach = screen.getByText(exampleCoach.name);
  userEvent.click(coach);

  const removeCoachButton = screen.getByRole('button', {
    name: /Remove/i,
  });
  expect(removeCoachButton).toBeEnabled();
});
