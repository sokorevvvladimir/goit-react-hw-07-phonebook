import { useState } from 'react';
// import { nanoid } from 'nanoid';
import styled from 'styled-components';
import toast from 'react-hot-toast';
import { useCreateContactMutation } from '../../redux/contactsSlice';
import { useGetAllContactsQuery } from '../../redux/contactsSlice';
import { Oval } from 'react-loader-spinner';

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
    width: 40%;
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
  @media (min-width: 769px) {
    width: 20vw;
  }
  @media (min-width: 1024px) {
    width: 10vw;
  }
`;

const ContactForm = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const { data } = useGetAllContactsQuery();
  const contacts = data;
  const [createContact, { isLoading }] = useCreateContactMutation();

  const onSameName = data => {
    return contacts.find(
      ({ name }) => name.toLowerCase() === data.name.toLowerCase()
    );
  };

  const onSamePhoneNumber = data => {
    return contacts.find(({ phone }) => phone === data.phone);
  };

  const onFormSubmit = data => {
    if (onSameName(data)) {
      toast.error(`${data.name} is already in contacts.`);
      return;
    }
    if (onSamePhoneNumber(data)) {
      toast.error(`Contact with ${data.phone} number is already in contacts.`);
      return;
    }

    createContact(data);
    toast.success(`${data.name} added to your contacts!`);
    return;
  };

  const onInputHandler = e => {
    const { name, value } = e.currentTarget;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'phone':
        setPhone(value);
        break;
      default:
        return;
    }
  };

  const onSubmitHandler = e => {
    e.preventDefault();
    onFormSubmit({ name, phone });
    reset();
  };

  const reset = () => {
    setName('');
    setPhone('');
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
          Phone
          <Input
            type="tel"
            name="phone"
            value={phone}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={onInputHandler}
          />
        </Label>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <Oval color="#25515a" height={20} width={20} />
          ) : (
            'Add contact'
          )}
        </Button>
      </FormHtml>
    </>
  );
};

export default ContactForm;
