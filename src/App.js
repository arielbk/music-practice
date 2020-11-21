import styled from 'styled-components';
import { FiMusic } from 'react-icons/fi';
import Scales from './components/Scales';
import CircleOfFifths from './components/CircleOfFifths';

const Container = styled.div`
  max-width: 1100px;
  margin: 3rem auto;
  color: #555;
  
  .header {
    display: flex;
    font-size: 42px;
    margin: 0;
    h1 {
      font-weight: 600;
      font-size: 34px;
      display: inline-block;
      margin: 0 1.4rem 2rem;
    }
  }
`;

function App() {
  return (
    <Container>
      <div className="header">
        <FiMusic />
        <h1>Music Trainer</h1>
      </div>
      <Scales />
      <CircleOfFifths />
    </Container>    
  );
}

export default App;
