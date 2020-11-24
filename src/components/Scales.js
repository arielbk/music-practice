import { useState, useEffect } from 'react';
import styled from 'styled-components';
import MidiPlayer from './MidiPlayer';
import { FormControl, FormLabel, IconButton, Switch } from '@chakra-ui/react';
import { AiOutlineStepBackward, AiOutlineStepForward } from 'react-icons/ai';
import MusicSheet from './MusicSheet';

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
  F: 'F2 G2 A2 _B2 c2 d2 e2 f2',
  // 12 - 23 are minor scales
  Amin: 'A,2 B,2 C2 D2 E2 F2 G2 A2',
  Emin: 'E2 ^F2 G2 A2 B2 c2 d2 e2',
  Bmin: 'B,2 ^C2 D2 E2 ^F2 G2 A2 B2',
  'F♯min': '^F2 ^G2 A2 B2 ^c2 d2 e2 ^f2',
  'C♯min': '^C2 ^D2 E2 ^F2 ^G2 A2 B2 ^c2',
  'G♯min': '^G,2 ^A,2 B,2 ^C2 ^D2 E2 ^F2 ^G2',
  'D♯min': '^D2 ^E2 ^F2 ^G2 ^A2 B2 ^c2 ^d2',
  'B♭min': '_B,2 C2 _D2 _E2 F2 _G2 _A2 _B2',
  Fmin: 'F2 G2 _A2 _B2 c2 _d2 _e2 f2',
  Cmin: 'C2 D2 _E2 F2 G2 _A2 _B2 c2',
  Gmin: 'G2 A2 _B2 c2 d2 _e2 f2 g2',
  Dmin: 'D2 E2 F2 G2 A2 _B2 c2 d2',
};

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
  box-shadow: 0 3px 30px rgba(0, 0, 0, 0.02);

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
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.05);
  }

  input[type='number'] {
    font-size: 1rem;
    border: none;
    border-bottom: 1px solid #ccc;
    width: 3rem;
  }
`;

const Settings = styled.div`
  padding: 2rem;
  color: #999;
  font-weight: 600;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: center;
  margin-bottom: 4rem;
`;

const ControlContainer = styled.div`
  width: 600px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  margin: 0 auto 4rem;
`;

const ScaleDisplay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  height: 280px;
  width: 280px;
  border-radius: 28px;
  background: #fff;
  box-shadow: 0 3px 30px rgba(0, 0, 0, 0.05);
  border: 1px solid #eee;
  padding: 1rem;
  h3 {
    font-size: 82px;
    color: #333;
  }
`;

export default function Scales() {
  const [includeMinors, setIncludeMinors] = useState(true);

  const [shuffledScales, setShuffledScales] = useState();
  const [scaleIndex, setScaleIndex] = useState(0);
  const [scale, setScale] = useState();

  const [scaleNotes, setScaleNotes] = useState();

  const shuffleScales = (filtered) => {
    setScaleIndex(0);
    setShuffledScales(shuffleArray(filtered));
  };

  const nextScale = () => {
    if (!shuffledScales || scaleIndex === shuffledScales.length - 1)
      return shuffleScales();
    setScaleIndex(scaleIndex + 1);
  };
  const previousScale = () => {
    if (!scaleIndex) return;
    setScaleIndex(scaleIndex - 1);
  };

  // set the scale name
  useEffect(() => {
    if (!shuffledScales) return;
    setScale(shuffledScales[scaleIndex]);
  }, [shuffledScales, scaleIndex]);

  // set the scale notes
  useEffect(() => {
    if (!scale) return;
    let ourScale = scales[scale].split(' ');
    let reverseScale = ourScale.reverse();
    reverseScale.shift();
    setScaleNotes(`|${scales[scale]} ${reverseScale}|`);
  }, [scale]);

  // reshuffle the scale when settings change
  useEffect(
    () =>
      shuffleScales(
        Object.keys(scales).filter((scale) =>
          includeMinors ? true : !scale.includes('min')
        )
      ),
    [includeMinors]
  );

  return (
    <Container>
      <div className="title">Scales</div>

      <Settings>
        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="include-minors" mb={0}>
            Include minors?
          </FormLabel>
          <Switch
            id="include-minors"
            colorScheme="teal"
            isChecked={includeMinors}
            onChange={(e) => setIncludeMinors(e.target.checked)}
          />
        </FormControl>
      </Settings>

      {scale ? (
        <ControlContainer>
          <IconButton
            icon={<AiOutlineStepBackward />}
            size="lg"
            disabled={!scaleIndex}
            onClick={previousScale}
          />
          <ScaleDisplay>
            <h3>{scale}</h3>
          </ScaleDisplay>
          <IconButton
            icon={<AiOutlineStepForward />}
            size="lg"
            onClick={nextScale}
          />
        </ControlContainer>
      ) : (
        ''
      )}

      {scaleNotes ? (
        <>
          <MusicSheet notation={scaleNotes} />
          <MidiPlayer notation={scaleNotes} />
        </>
      ) : (
        ''
      )}
    </Container>
  );
}
