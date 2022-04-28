import { Triangle } from 'react-loader-spinner';
import styled from 'styled-components';

const Div = styled.div`
  display: flex;
  justify-content: center;

  @media (min-width: 769px) {
    width: 80%;
  }
  @media (min-width: 1024px) {
    width: 40%;
  }
`;

const MainLoaderSpinner = () => {
  return (
    <Div>
      <Triangle color="#1cadca" height={80} width={80} />
    </Div>
  );
};

export default MainLoaderSpinner;
