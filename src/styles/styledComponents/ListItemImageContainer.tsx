import styled from 'styled-components';
import { itemVariant } from '../../types/types';

interface ListItemImageContainerProps {
  src: string;
  type?: itemVariant;
}

export const ListItemImageContainer = styled.div<ListItemImageContainerProps>`
  border-radius: ${(props) => (props.type === 'team' ? '50px' : '0px')};
  width: 25px;
  background-image: url(${(props) => props.src});
  overflow: hidden;
  background-size: cover;
  background-position: 50% 50%;
  min-width: 25px;
  min-height: 25px;
  background-repeat: no-repeat;
`;

export const FieldItemImageContainer = styled(ListItemImageContainer)`
  width: 50px;
  min-height: 50px;
`;
