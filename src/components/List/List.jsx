import styled from 'styled-components';
import { useSelector } from 'react-redux';
import Notification from '../Notification';
import { getFilter } from '../../redux/selectors';
import { useGetAllContactsQuery } from 'redux/contactsSlice';
import ListItem from 'components/ListItem';
import MainLoaderSpinner from 'components/MainLoaderSpinner';

const StyledUl = styled.ul`
  padding-inline-start: 0;
`;

const List = () => {
  const { data, isFetching } = useGetAllContactsQuery();
  const contacts = data;
  const filter = useSelector(getFilter);

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts?.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const filteredContacts = getFilteredContacts();

  return (
    <StyledUl>
      {isFetching && <MainLoaderSpinner />}
      {contacts &&
        !isFetching &&
        filteredContacts.map(contact => {
          return <ListItem key={contact.id} {...contact} />;
        })}
      {(!contacts || contacts.length === 0) && !isFetching && <Notification />}
    </StyledUl>
  );
};

export default List;
