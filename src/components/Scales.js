import { useState, useEffect } from 'react';
import styled from 'styled-components';
import SheetMusic from 'react-sheet-music';
import MidiPlayer from './MidiPlayer';

const scales = {
  C: 'C2 D2 E2 F2 G2 A2 B2 c2',
  G: 'G2 A2 B2 c2 d2 e2 ^f2 g2',
  D: 'D2 E2 ^F2 G2 A2 B2 ^c2 d2',
  A: 'A,2 B,2 ^C2 D2 E2 ^F2 ^G2 A2',
  E: 'E2 ^F2 ^G2 A2 B2 ^c2 ^d2 e2',
  B: 'B,2 ^C2 ^D2 E2 ^F2 ^G2 ^A2 B2',
  'F♯': '^F2 ^G2 ^A2 B2 ^c2 ^d2 ^e2 ^f2',
  'D♭': '_D2 _E2 F2 _G2 _A2 _B2 c2 _d2',
  'A♭': '_A,2 _B,2 C2 _D2 _E2 F2 G2 _A2',
  'E♭': '_E2 F2 G2 _A2 _B2 c2 d2 _e2',
  'B♭': '_B,2 C2 D2 _E2 F2 G2 A2 _B2',
  'F': 'F2 G2 A2 _B2 c2 d2 e2 f2',  
}

const Container = styled.div`
  position: relative;
  max-width: 1200px;
  padding: 4rem;
  margin: 0 auto 3rem;
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

  input[type='number'] {
    font-size: 1rem;
    border: none;
    border-bottom: 1px solid #ccc;
    width: 3rem;
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
  margin: 6rem 0 3rem;
  text-align: left;
`;

const Settings = styled.div`
  margin: 1.5rem 0 0;
  color: #999;
  font-weight: 600;
`;

const ScaleDisplay = styled.h3`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  position: absolute;
  font-size: 82px;
  right: calc(5% + 2rem);
  top: calc(50% - 170px);
  color: #333;
  width: 60px;
  text-align: center;
  background: #fff;
  height: 220px;
  width: 220px;
  border-radius: 28px;
  background: #fff;
  box-shadow: 0 3px 30px rgba(0,0,0,0.05);
  border: 1px solid #eee;
`;

const SheetContainer = styled.div`
  ${props => props.showNotes ? '' : 'filter: blur(17px);'}
  height: 130px;
`;

export default function Scales() {
  const [scale, setScale] = useState();
  const [scaleNotes, setScaleNotes] = useState();
  const [withMinors, setWithMinors] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [bpm, setBpm] = useState(90);

  // todo: generate a random order and cycle through to avoid dupes
  const generateScale = () => {
    const randomIndex = Math.floor(Math.random() * 12);
    let newScale = Object.keys(scales)[randomIndex];
    if (withMinors) newScale += Math.floor(Math.random() * 2) ? 'min' : '';
    setScale(newScale);
  }

  useEffect(() => {
    if (!scale) return;
    let reverseScale = scales[scale]?.split(' ').reverse();
    reverseScale.shift();
    setScaleNotes(`|${scales[scale]} ${reverseScale}|`);
  }, [scale])

  return (
    <Container>
      <div className="title">
        Scales
      </div>
      <Settings>
      <label htmlFor="withMinors" style={{marginRight: 16}}>With minors:</label>
      <input disabled id="withMinors" name="withMinors" type="checkbox" checked={withMinors} onChange={e => setWithMinors(e.target.checked)} />
      <label htmlFor="showNotes" style={{marginRight: 16, marginLeft: 32}}>Show notes:</label>
      <input id="showNotes" name="showNotes" type="checkbox" checked={showNotes} onChange={e => setShowNotes(e.target.checked)} />
      <label htmlFor="bpm" style={{marginRight: 16, marginLeft: 32}}>BPM:</label>
      <input id="bpm" name="bpm" type="number" value={bpm} onChange={e => setBpm(e.target.value)} />
      </Settings>
      <GenerateButton onClick={generateScale}>
        Random scale
      </GenerateButton>
      {scale ? <ScaleDisplay>{scale}</ScaleDisplay> : ''}

      {/* // todo: CSS blur effect if not shown */}
      {scaleNotes ? (<>
        <MidiPlayer notation={scaleNotes} bpm={bpm} /> 
        <SheetContainer showNotes={showNotes}>
        <SheetMusic notation={scaleNotes} />
        </SheetContainer>
      </>) : ''}
      
    </Container>
  )
}