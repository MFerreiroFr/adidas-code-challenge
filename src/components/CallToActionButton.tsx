import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useTypedSelector } from '../hooks/use-typed-selector';
import { FieldPlayerRow } from '../interfaces/item.interface';
import { CTAButton } from '../styles/styledComponents/Buttons';

const CallToActionButton: React.FC = () => {
  const fieldPlayers = useTypedSelector(
    ({ myTeam: { fieldPlayers } }) => fieldPlayers
  );
  const benchPlayers = useTypedSelector(
    ({ myTeam: { benchPlayers } }) => benchPlayers
  );

  const teamHasCoach = useTypedSelector(
    ({ myTeam: { myTeamCoach } }) => myTeamCoach !== null
  );

  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    renderValidationErrors(benchPlayers, fieldPlayers);
  }, [benchPlayers, fieldPlayers]);

  const renderValidationErrors = (
    bench: FieldPlayerRow,
    field: FieldPlayerRow
  ): void => {
    let errorMessages: string[] = [];
    errorMessages = fieldValidation(field, errorMessages); // checks the field is full of players
    errorMessages = minGoalkeepersValidation(bench, errorMessages); // checks that there is at least 1 goalkeeper in the bench (min 2 gks, fieldValidation + restrictions on app behaviour validates there's a gk on the field)
    errorMessages = teamHasCoachValidation(teamHasCoach, errorMessages);

    setErrors(errorMessages);
  };

  const fieldValidation = (
    field: FieldPlayerRow,
    errorMessages: string[]
  ): string[] => {
    if (field.players.length < field.maxPlayers)
      return [
        ...errorMessages,
        'Your field needs to be full of players (1 gk, 4 df, 4 mf, 2fw)',
      ];
    return errorMessages;
  };

  const minGoalkeepersValidation = (
    bench: FieldPlayerRow,
    errorMessages: string[]
  ): string[] => {
    const goalkeeperInBench = bench.players.some(
      (player) => player.position === 'gk'
    );
    if (!goalkeeperInBench) {
      return [...errorMessages, 'You need at least 1 goalkeeper in your bench'];
    }
    return errorMessages;
  };

  const teamHasCoachValidation = (
    teamHasCoach: boolean,
    errorMessages: string[]
  ): string[] => {
    if (!teamHasCoach)
      return [...errorMessages, 'You need to select a coach for your team'];
    return errorMessages;
  };
  const renderErrorMessages = (errors: string[]) =>
    errors.map((errorMessage, i) => (
      <li key={i}>
        <p>{errorMessage}</p>
      </li>
    ));

  return (
    <CallToActionContainer>
      <CTAButton color='success' disabled={!!errors.length}>
        Save
      </CTAButton>
      {!!errors.length && (
        <ErrorMessagesContainer id='errors'>
          <ul>{renderErrorMessages(errors)}</ul>
        </ErrorMessagesContainer>
      )}
    </CallToActionContainer>
  );
};

export default CallToActionButton;

const CallToActionContainer = styled.div`
  position: relative;
  &:hover #errors {
    opacity: 1;
  }
`;

const ErrorMessagesContainer = styled.div`
  position: absolute;
  width: 350px;
  top: -25px;
  right: 110px;
  opacity: 0;
  background-color: ${(props) => props.theme.colors.white};
  padding: 0 20px;
  z-index: 1;
  color: ${(props) => props.theme.colors.black};
`;
