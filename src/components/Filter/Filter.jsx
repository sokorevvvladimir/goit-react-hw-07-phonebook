import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { changeFilter } from '../../redux/filterSlice';
import { getFilter } from '../../redux/selectors';
import { useGetContactsByNameQuery } from 'redux/contactsSlice';

const Label = styled.label`
  display: flex;
  flex-direction: column;
  font-size: 18px;
  font-weight: 500;
`;

const Input = styled.input`
  width: 95%;
  margin-top: 5px;
  &:focus {
    outline: 3px solid #1ac7d2;
    border: none;
  }
    @media (min-width: 769px){
    width: 80%;
  };
  @media (min-width: 1024px) {
    width: 40%;
  })
`;

const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(getFilter);

  const onInputHandler = e => {
    dispatch(changeFilter(e.currentTarget.value));
  };

  useGetContactsByNameQuery(filter, {
    skip: filter === '',
  });

  return (
    <Label>
      Find contacts by name
      <Input type="text" value={filter} onChange={onInputHandler} />
    </Label>
  );
};

export default Filter;
