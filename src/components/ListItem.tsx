import { Item } from '../interfaces/item.interface';
import { itemVariant } from '../types/types';
import { ListItemImageContainer } from '../styles/styledComponents/ListItemImageContainer';

import styled from 'styled-components';

const StyledListItem = styled.div<StyledListItemProps>`
  display: flex;
  height: 30px;
  margin: 4px 0;
  padding: 5px;
  align-items: center;
  justify-content: space-between;
  color: ${(props) =>
    props.selected ? props.theme.colors.black : props.theme.colors.white};
  text-transform: uppercase;
  background-image: linear-gradient(
    120deg,
    transparent 0%,
    transparent 50%,
    ${(props) => props.theme.colors.white} 50%
  );
  background-size: 220%;
  transition: background-position 0.4s, transform 0.4s;
  font-weight: 300;
  min-width: 250px;
  background-position: ${(props) => (props.selected ? '100%' : '')};

  &:hover {
    background-position: 100%;
    /* transform: translateY(-5px); */
    color: ${(props) => props.theme.colors.black};
  }
`;

const ListItemParagraph = styled.p`
  font-size: 16px;
  padding: 8px;
`;

const ListItemParagraphContainer = styled.div`
  width: 100%;
  text-align: center;
  cursor: pointer;
  font-weight: 400;
`;

interface StyledListItemProps {
  selected: boolean;
}

interface ListItemProps {
  item: Item;
  type?: itemVariant;
  onSelect: (id: number) => void;
  selected: boolean;
  testId: string;
}

const ListItem: React.FC<ListItemProps> = ({
  item,
  type = 'team',
  onSelect,
  selected,
  testId,
}) => {
  const { src, id } = item;

  return (
    <StyledListItem selected={selected}>
      <ListItemImageContainer src={src} type={type}></ListItemImageContainer>
      <ListItemParagraphContainer
        data-testid={testId}
        onClick={() => onSelect(id)}
      >
        <ListItemParagraph>{item.name}</ListItemParagraph>
      </ListItemParagraphContainer>
    </StyledListItem>
  );
};

export default ListItem;
