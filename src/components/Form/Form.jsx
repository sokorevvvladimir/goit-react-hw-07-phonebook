import { useState } from 'react';
import { nanoid } from 'nanoid';
import styled from 'styled-components';
import { getContacts } from '../../redux/selectors';
import { useSelector, useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { addItem } from '../../redux/itemsSlice';

const FormHtml = styled.form`
  border: 2px solid #000000;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  // width: 100%;
  height: 150px;
  padding: 10px;
  background-image: repeating-linear-gradient(
    -45deg,
    #1cadca,
    #1cadca 10px,
    #25515a 10px,
    #25515a 20px
  );
  @media (min-width: 769px){
    width: 80%;
  };
  @media (min-width: 1024px) {
    width: 30%;
  })
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  font-weight: 700;
  color: #ffffff;
`;

const Input = styled.input`
  width: 95%;
  margin-top: 5px;
  &:focus {
    outline: 3px solid #1ac7d2;
    border: none;
  }
`;

const Button = styled.button`
  width: 40vw;
  height: 40px;
  font-size: 12px;
  font-weight: 400;
  border-radius: 3px;
  cursor: pointer;

  &:hover {
    background-color: #cde2e5;
  }
  &:active {
    color: #ffffff;
    background-color: #b3c2c4;
  }
  @media (min-width: 769px) {
    width: 20vw;
  }
  @media (min-width: 1024px) {
    width: 10vw;
  }
`;

const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();

  const onSameName = data => {
    return contacts.find(
      ({ name }) => name.toLowerCase() === data.name.toLowerCase()
    );
  };

  const onSamePhoneNumber = data => {
    return contacts.find(({ number }) => number === data.number);
  };

  const onFormSubmit = data => {
    if (onSameName(data)) {
      toast.error(`${data.name} is already in contacts.`);
      return;
    }
    if (onSamePhoneNumber(data)) {
      toast.error(`Contact with ${data.number} number is already in contacts.`);
      return;
    }
    dispatch(addItem(data));
    return;
  };

  const onInputHandler = e => {
    const { name, value } = e.currentTarget;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };

  const objectCompiler = () => {
    return { name, number, id: nanoid() };
  };

  const onSubmitHandler = e => {
    e.preventDefault();
    onFormSubmit(objectCompiler());
    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <>
      <FormHtml onSubmit={onSubmitHandler}>
        <Label>
          Name
          <Input
            type="text"
            name="name"
            value={name}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={onInputHandler}
          />
        </Label>
        <Label>
          Number
          <Input
            type="tel"
            name="number"
            value={number}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={onInputHandler}
          />
        </Label>
        <Button type="submit">Add contact</Button>
      </FormHtml>
    </>
  );
};

export default ContactForm;
