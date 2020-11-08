import styled from 'styled-components';
import { FiMusic } from 'react-icons/fi';
import Scales from './components/Scales';

const Container = styled.div`
  max-width: 1100px;
  padding: 2rem;
  margin: 0 auto;
  color: #555;
  
  .header {
    display: flex;
    font-size: 31px;
    margin: 1rem 0;
    h1 {
      font-weight: 600;
      font-size: 27px;
      display: inline-block;
      margin: 0 1.4rem;
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
    </Container>    
  );
}

export default App;
