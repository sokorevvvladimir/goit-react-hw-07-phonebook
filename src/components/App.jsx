import styled from 'styled-components';
import List from './List';
import ContactForm from './Form';
import Filter from './Filter';
import { Toaster } from 'react-hot-toast';

const Container = styled.div`
  width: 95vw;
  margin: 0 auto;
`;

const App = () => {
  return (
    <Container>
      <h1>Phonebook</h1>
      <ContactForm />
      <h2>Contacts</h2>
      <Filter />
      <List />
      <Toaster />
    </Container>
  );
};

export default App;
