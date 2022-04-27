import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem } from '../../redux/itemsSlice';
import Notification from '../Notification';
import { getContacts, getFilter } from '../../redux/selectors';

const StyledUl = styled.ul`
  padding-inline-start: 0;
`;

const Li = styled.li`
  font-size: 18px;
  font-weight: 500;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #1cadca;
  color: #ffffff;
  padding: 10px;

  &:nth-child(2n) {
    background-color: #25515a;
  }

  &:not(:last-child) {
    margin-bottom: 15px;
  }

  @media (min-width: 769px){
    width: 80%;
  };
  @media (min-width: 1024px) {
    width: 30%;
  })
`;

const Button = styled.button`
  width: 100px;
  min-width: 100px;
  height: 40px;
  font-size: 12px;
  font-weight: 400;
  border-radius: 3px;
  margin-left: 10px;
  max-height: 40px;
  cursor: pointer;

  &:hover {
    background-color: #cde2e5;
  }
  &:active {
    color: #ffffff;
    background-color: #b3c2c4;
  }
`;

const List = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);

  const getFilteredContacts = () => {
    if (contacts.length === 0) {
      return contacts;
    }
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const filteredContacts = getFilteredContacts();

  return (
    <StyledUl>
      {contacts &&
        filteredContacts.map(({ name, id, number }) => {
          return (
            <Li key={id}>
              {name}: {number}
              <Button onClick={() => dispatch(removeItem(id))}>Delete</Button>
            </Li>
          );
        })}
      {contacts.length === 0 && <Notification />}
    </StyledUl>
  );
};

export default List;
