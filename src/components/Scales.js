import { useState } from 'react';
import styled from 'styled-components';

const scales = [
  'C',
  'G',
  'D',
  'A',
  'E',
  'B',
  'F♯',
  'D♭',
  'A♭',
  'E♭',
  'B♭',
  'F'
];

const Container = styled.div`
  position: relative;
  max-width: 1200px;
  padding: 4rem 2rem 2rem;
  margin: 0 auto;
  color: #333;
  background: #fff;
  margin-top: 3rem;
  border-radius: 7px;
  box-shadow: 0 3px 30px rgba(0,0,0,0.02);
  
  .title {
    font-weight: 600;
    display: flex;
    font-size: 21px;
    background: #d9d9d9;
    width: 100%;
    box-sizing: border-box;
    position: absolute;
    left: 0;
    top: 0;
    border-radius: 7px 7px 0 0;
    padding: 1rem 2rem;
  }
`;

const GenerateButton = styled.div`
  display: inline-block;
  padding: 0.5rem 1.2rem;
  background: #eee;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 2rem;
  color: #333;
  text-align: left;
  `;

const ScaleDisplay = styled.h3`
  position: absolute;
  font-size: 42px;
  right: calc(5% + 2rem);
  top: 3rem;
  color: #333;
  width: 60px;
`;

export default function Scales() {
  const [scale, setScale] = useState();

  const generateScale = () => {
    const randomIndex = Math.floor(Math.random() * 12);
    setScale(scales[randomIndex]);
  }

  return (
    <Container>
      <div className="title">
        Scales
      </div>
      <GenerateButton onClick={generateScale}>
        Generate scale
      </GenerateButton>
      {scale ? <ScaleDisplay>{scale}</ScaleDisplay> : ''}
    </Container>
  )
}