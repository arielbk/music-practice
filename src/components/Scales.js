import { useState, useEffect } from 'react';
import styled from 'styled-components';
import SheetMusic from 'react-sheet-music';
import MidiPlayer from './MidiPlayer';
import {GrFormNextLink} from 'react-icons/gr';

const scales = {
  // 0 - 11 are major scales
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
  // 12 - 23 are minor scales
  Amin: 'A,2 B,2 C2 D2 E2 F2 G2 A2',
  Emin: 'E2 ^F2 G2 A2 B2 c2 d2 e2',
  Bmin: 'B,2 ^C2 D2 E2 ^F2 G2 A2 B2',
  'F♯min': '^F2 ^G2 A2 B2 ^c2 d2 e2 ^f2',
  'C♯min': '^C2 ^D2 E2 ^F2 ^G2 A2 B2 ^c2',
  'G♯min': '^G,2 ^A,2 B,2 ^C2 ^D2 E2 ^F2 ^G2',
  'D♯min': '^D2 ^E2 ^F2 ^G2 ^A2 B2 ^c2 ^d2',
  'B♭min': '_B,2 C2 _D2 _E2 F2 _G2 _A2 _B2',
  'Fmin': 'F2 G2 _A2 _B2 c2 _d2 _e2 f2',
  'Cmin': 'C2 D2 _E2 F2 G2 _A2 _B2 c2',
  'Gmin': 'G2 A2 _B2 c2 d2 _e2 f2 g2',
  'Dmin': 'D2 E2 F2 G2 A2 _B2 c2 d2',  
}

function shuffleArray(array) {
  const shuffledArray = [...array];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

const Container = styled.div`
  position: relative;
  max-width: 1200px;
  padding: 4rem 3rem;
  margin: 0 auto 3rem;
  color: #333;
  background: #fff;
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
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 1rem 3rem;
  font-size: 1.4rem;
  background: #eee;
  border-radius: 7px;
  cursor: pointer;
  margin: 6rem 0 3rem;
  text-align: left;
  color: #777;
  transition: 0.1s;

  svg {
    font-size: 2rem;
    margin-left: 2rem;
    transform: translateX(0px);
    transition: 0.3s;
  }

  &:hover {
    background: #ddd;
    svg {
      transform: translateX(10px);
    }
  }
`;

const Settings = styled.div`
  padding: 2rem;
  color: #999;
  font-weight: 600;
  border-bottom: 1px solid #eee;
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
  position: relative;
  color: #000;
  ${props => props.showNotes ? '' : `filter: blur(15px);`}
  height: 130px;
  transition: 0.07s filter;
  margin: 0 auto;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;

  #paper {
    width: 750px;
  }
`;

const HoverViewLabel = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 0.7rem;
  background: rgba(255, 255, 255, 0.5);
  padding: 0.4rem 0.7rem;
  border-radius: 3px;
`;

const MidiContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;

  form {
    margin-right: 2rem;
    border: 1px solid #eee;
    padding: 2rem 1rem;
    top: -1rem;
    position: relative;
  }
`;

export default function Scales() {
  const [withMinors, setWithMinors] = useState(false);
  const [shuffledScales, setShuffledScales] = useState();
  const [scaleIndex, setScaleIndex] = useState(0);
  const [scale, setScale] = useState();
  const [scaleNotes, setScaleNotes] = useState();
  const [showNotes, setShowNotes] = useState(false);
  const [bpm, setBpm] = useState(90);

  const shuffleScales = () => setShuffledScales(shuffleArray(Object.keys(scales)));

  const nextScale = () => {
    if (scaleIndex !== undefined) return shuffleScales();
    if (scaleIndex === shuffledScales.length - 1) return shuffleScales();
    setScaleIndex(scaleIndex + 1);
  }

  useEffect(() => {
    if (!shuffledScales) return;
    setScale(shuffledScales[scaleIndex]);
  }, [shuffledScales, scaleIndex]);

  useEffect(() => {
    if (!scale) return;
    let ourScale = scales[scale].split(' ');
    let reverseScale = ourScale.reverse();
    reverseScale.shift();
    setScaleNotes(`|${scales[scale]} ${reverseScale}|`);
  }, [scale]);

  return (
    <Container>
      <div className="title">
        Scales
      </div>
      <Settings>
      <label htmlFor="withMinors" style={{marginRight: 16}}>Include minors:</label>
      <input id="withMinors" name="withMinors" type="checkbox" checked={withMinors} onChange={e => setWithMinors(e.target.checked)} />
      </Settings>
      <GenerateButton onClick={nextScale}>
        Random scale
        <GrFormNextLink />
      </GenerateButton>
      {scale ? <ScaleDisplay>{scale}</ScaleDisplay> : ''}

      {scaleNotes ? (<>
          <MidiContainer>
            <form>
              <label htmlFor="bpm" style={{marginRight: 16, marginLeft: 32}}>BPM:</label>
              <input id="bpm" name="bpm" type="number" value={bpm} onChange={e => setBpm(e.target.value)} />
            </form>
            <MidiPlayer notation={scaleNotes} bpm={bpm} /> 
          </MidiContainer>
        <div style={{position: 'relative'}}>
        <SheetContainer showNotes={showNotes} onMouseEnter={() => setShowNotes(true)} onMouseLeave={() => setShowNotes(false)}>
        <SheetMusic notation={scaleNotes} />
        </SheetContainer>
        {showNotes ? '' : <HoverViewLabel>Hover to view sheet</HoverViewLabel>}
        </div>
      </>) : ''}
      
    </Container>
  )
}