import { Switch, useColorMode } from '@chakra-ui/react';
import { FiMusic } from 'react-icons/fi';
import styled from 'styled-components';
import Scales from './components/Scales';

const Header = styled.header`
  justify-content: space-between;
  align-items: center;
  display: flex;
  font-size: 42px;
  padding: 2rem 4rem;

  h1 {
    font-weight: 600;
    font-size: 34px;
    display: inline-block;
    margin: 0 1.4rem 0;
  }
  svg {
    display: inline;
  }
`;

const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto 4rem;
  color: #555;
`;

function App() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <Header>
        <div>
          <FiMusic />
          <h1>Music Trainer</h1>
        </div>
        <Switch
          id="toggle-dark-mode"
          colorScheme="teal"
          isChecked={colorMode === 'dark'}
          onChange={toggleColorMode}
          size="lg"
        />
      </Header>
      <Container>
        <Scales />
      </Container>
    </>
  );
}

export default App;
