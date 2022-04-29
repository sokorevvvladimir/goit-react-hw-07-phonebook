import styled from 'styled-components';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { clearFilter } from 'redux/filterSlice';
import {
  useDeleteContactMutation,
  useUpdateContactMutation,
} from 'redux/contactsSlice';
import { Oval } from 'react-loader-spinner';
import toast from 'react-hot-toast';
import Modal from 'components/Modal';

const Li = styled.li`
  font-size: 18px;
  font-weight: 500;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #1cadca;
  color: #ffffff;
  padding: 10px;
  height: 100px;

  &:nth-child(2n) {
    background-color: #25515a;
  }

  &:not(:last-child) {
    margin-bottom: 15px;
  }

  @media (min-width: 769px){
    width: 80%;
    height: 50px;
  };
  @media (min-width: 1024px) {
    width: 40%;
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
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: #cde2e5;
  }
  &:active {
    color: #ffffff;
    background-color: #b3c2c4;
  }
`;

const StyledDiv = styled.div`
  height: 90px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  @media (min-width: 769px) {
    flex-direction: row;
    max-height: 40px;
  } ;
`;

const ModalButton = styled.button`
  width: 15vw;
  height: 40px;
  font-size: 20px;
  font-weight: 400;
  border-radius: 3px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  margin-right: auto;

  &:hover {
    background-color: #cde2e5;
  }
  &:active {
    color: #ffffff;
    background-color: #b3c2c4;
  }
`;

const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 80%;
  padding: 10px;
  background-image: repeating-linear-gradient(
    -45deg,
    #1cadca,
    #1cadca 10px,
    #25515a 10px,
    #25515a 20px
  );
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 95%;
  margin-top: 5px;
  &:focus {
    outline: 3px solid #1ac7d2;
    border: none;
  }
`;

const ListItem = ({ id, name, phone }) => {
  const dispatch = useDispatch();
  const [deleteContact, { isLoading: isDeleting }] = useDeleteContactMutation();
  const [updateContact, { isLoading }] = useUpdateContactMutation();
  const [isShown, setIsshown] = useState(false);
  const [newName, setNewName] = useState(name);
  const [newPhone, setNewPhone] = useState(phone);

  const toggleModal = () => {
    setIsshown(!isShown);
  };

  const onFormSubmit = data => {
    const { id, newName: name, newPhone: phone } = data;

    updateContact({ id, name, phone });
    toast.success(`${data.newName} contact corrected!`);
    return;
  };

  const onInputHandler = e => {
    const { name, value } = e.currentTarget;
    switch (name) {
      case 'name':
        setNewName(value);
        break;
      case 'phone':
        setNewPhone(value);
        break;
      default:
        return;
    }
  };

  const onSubmitHandler = e => {
    e.preventDefault();
    onFormSubmit({ id, newName, newPhone });
  };

  return (
    <>
      {isShown && (
        <Modal isShown={isShown} onClose={toggleModal}>
          <ModalForm onSubmit={onSubmitHandler}>
            <Label>
              Name
              <Input
                type="text"
                name="name"
                value={newName}
                pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                required
                onChange={onInputHandler}
              />
            </Label>
            <Label>
              Phone
              <Input
                type="tel"
                name="phone"
                value={newPhone}
                pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                required
                onChange={onInputHandler}
              />
            </Label>
            <ModalButton type="submit" disabled={isLoading}>
              {isLoading ? (
                <Oval color="#25515a" height={20} width={20} />
              ) : (
                'OK'
              )}
            </ModalButton>
          </ModalForm>
        </Modal>
      )}
      <Li>
        {name}: {phone}
        <StyledDiv>
          <Button type="button" onClick={toggleModal}>
            Edit
          </Button>
          <Button
            type="button"
            onClick={() => {
              dispatch(clearFilter());
              deleteContact(id);
              toast.success(`${name} deleted from your contacts!`);
            }}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <Oval color="#25515a" height={20} width={20} />
            ) : (
              'Delete'
            )}
          </Button>
        </StyledDiv>
      </Li>
    </>
  );
};

export default ListItem;
