import styled from 'styled-components';

type buttonColors = 'success' | 'error' | 'action';
interface ButtonProps {
  color: buttonColors;
}

export const StyledButton = styled.button<ButtonProps>`
  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) => props.theme.colors[props.color]};
  border: 0;
  border-radius: 2px;
  height: 20px;
  cursor: pointer;
  &:disabled {
    opacity: 0.4;
  }
  width: 100%;
`;

export const ActionButton = styled(StyledButton)<ButtonProps>`
  width: 49%;
`;

export const CTAButton = styled(StyledButton)<ButtonProps>`
  width: 100px;
`;
