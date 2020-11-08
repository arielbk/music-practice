import { useState, useEffect } from 'react';
import styled from 'styled-components';
import SheetMusic from 'react-sheet-music';
import { Midi } from 'react-abc';

const scales = {
  C: 'C2 D2 E2 F2 G2 A2 B2 c2',
  G: 'G2 A2 B2 c2 d2 e2 ^f2 g2',
  D: 'D2 E2 ^F2 G2 A2 B2 ^c2 d2',
  A: 'A,2 B,2 ^C2 D2 E2 ^F2 ^G2 A2',
  E: 'E2 ^F2 ^G2 A2 B2 ^c2 ^d2 e2',
  B: 'B,2 ^C2 ^D2 E2 ^F2 ^G2 ^A2 B2',
  'F♯': '^F2 ^G2 ^A2 B2 ^c2 ^d2 f2 ^f2',
}

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
    background: #f0f0f0;
    width: 100%;
    box-sizing: border-box;
    position: absolute;
    left: 0;
    top: 0;
    border-radius: 7px 7px 0 0;
    padding: 1rem 2rem;
    box-shadow: inset 0 0 5px rgba(0,0,0,0.05);
  }
`;

const GenerateButton = styled.div`
  display: inline-block;
  padding: 1rem 3rem;
  font-size: 1.4rem;
  background: #eee;
  border: none;
  border-radius: 7px;
  cursor: pointer;
  margin: 4rem 2rem;
  text-align: left;
  `;

const Settings = styled.div`
  margin: 1.5rem 0 0;
  color: #999;
  font-weight: 600;
`;

const ScaleDisplay = styled.h3`
  margin: 0;
  position: absolute;
  font-size: 48px;
  left: calc(70% - 2rem);
  top: calc(50%);
  color: #333;
  width: 60px;
  text-align: center;
`;

const SheetContainer = styled.div`
  ${props => props.showNotes ? '' : 'filter: blur(17px);'}
`;

const MidiContainer = styled.div`
  width: 80%;
  margin: 2rem auto;
  background: #ccc;
  border-radius: 7px;
  overflow: hidden;
`;

export default function Scales() {
  const [scale, setScale] = useState();
  const [scaleNotes, setScaleNotes] = useState();
  const [withMinors, setWithMinors] = useState(false);
  const [showNotes, setShowNotes] = useState(false);

  // todo: generate a random order and cycle through to avoid dupes
  const generateScale = () => {
    const randomIndex = Math.floor(Math.random() * 7);
    let newScale = Object.keys(scales)[randomIndex];
    if (withMinors) newScale += Math.floor(Math.random() * 2) ? 'min' : '';
    setScale(newScale);
  }

  useEffect(() => {
    if (scale) setScaleNotes(`|${scales[scale]}|`);
  }, [scale])

  return (
    <Container>
      <div className="title">
        Scales
      </div>
      <Settings>
      <label htmlFor="withMinors" style={{marginRight: 16}}>With minors:</label>
      <input id="withMinors" name="withMinors" type="checkbox" checked={withMinors} onChange={e => setWithMinors(e.target.checked)} />
      <label htmlFor="showNotes" style={{marginRight: 16, marginLeft: 32}}>Show notes:</label>
      <input id="showNotes" name="showNotes" type="checkbox" checked={showNotes} onChange={e => setShowNotes(e.target.checked)} />
      </Settings>
      <GenerateButton onClick={generateScale}>
        Generate scale
      </GenerateButton>
      {scale ? <ScaleDisplay>{scale}</ScaleDisplay> : ''}

      {/* // todo: CSS blur effect if not shown */}
      {scaleNotes ? (<>
        <SheetContainer showNotes={showNotes}>
        <SheetMusic notation={scaleNotes} />
        </SheetContainer>
        <MidiContainer>
          <Midi key={scale} notation={scaleNotes} />
        </MidiContainer>
      </>) : ''}
      
    </Container>
  )
}