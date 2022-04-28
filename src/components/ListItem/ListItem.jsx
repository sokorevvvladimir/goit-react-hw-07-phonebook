import styled from 'styled-components';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { clearFilter } from 'redux/filterSlice';
import { useDeleteContactMutation } from 'redux/contactsSlice';
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
  width: 50px;
  height: 50px;
  font-size: 20px;
  font-weight: 400;
  border-radius: 3px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;

  &:hover {
    background-color: #cde2e5;
  }
  &:active {
    color: #ffffff;
    background-color: #b3c2c4;
  }
`;

const ListItem = ({ id, name, phone }) => {
  const dispatch = useDispatch();
  const [deleteContact, { isLoading: isDeleting }] = useDeleteContactMutation();
  const [isShown, setIsshown] = useState(false);

  const toggleModal = () => {
    setIsshown(!isShown);
  };

  return (
    <>
      {isShown && (
        <Modal isShown={isShown} onClose={toggleModal}>
          <ModalButton onClick={toggleModal}>OK</ModalButton>
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
