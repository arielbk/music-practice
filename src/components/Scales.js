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
  justify-content: flex-start;
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
  position: relative;
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
    margin-bottom: 1rem;
    font-size: 82px;
    color: #333;
  }
  small {
    position: absolute;
    bottom: 1rem;
    font-size: 1rem;
    color: #bbb;
  }
`;

export default function Scales() {
  const [includeMinors, setIncludeMinors] = useState(true);
  const [isShuffle, setIsShuffle] = useState(false);

  const [scaleSequence, setScaleSequence] = useState();
  const [scaleIndex, setScaleIndex] = useState(0);
  const [scale, setScale] = useState();

  const [scaleNotes, setScaleNotes] = useState();

  const sequenceScales = (filtered) => {
    setScaleIndex(0);
    setScaleSequence(isShuffle ? shuffleArray(filtered) : filtered);
  };

  const nextScale = () => {
    if (!scaleSequence || scaleIndex === scaleSequence.length - 1)
      return sequenceScales(
        Object.keys(scales).filter((scale) =>
          includeMinors ? true : !scale.includes('min')
        )
      );
    setScaleIndex(scaleIndex + 1);
  };
  const previousScale = () => {
    if (!scaleIndex) return;
    setScaleIndex(scaleIndex - 1);
  };

  // set the scale name
  useEffect(() => {
    if (!scaleSequence) return;
    setScale(scaleSequence[scaleIndex]);
  }, [scaleSequence, scaleIndex]);

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
      sequenceScales(
        Object.keys(scales).filter((scale) =>
          includeMinors ? true : !scale.includes('min')
        )
      ),
    [includeMinors, isShuffle]
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
        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="is-shuffle" mb={0}>
            Shuffle scales?
          </FormLabel>
          <Switch
            id="is-shuffle"
            colorScheme="teal"
            isChecked={isShuffle}
            onChange={(e) => setIsShuffle(e.target.checked)}
          />
        </FormControl>
      </Settings>

      {scale ? (
        <ControlContainer>
          <IconButton
            icon={<AiOutlineStepBackward />}
            size="lg"
            isDisabled={!scaleIndex}
            onClick={previousScale}
            fontSize="2rem"
          />
          <ScaleDisplay>
            <h3>{scale}</h3>
            <small>
              {scaleIndex + 1} / {scaleSequence.length}
            </small>
          </ScaleDisplay>
          <IconButton
            icon={<AiOutlineStepForward />}
            size="lg"
            onClick={nextScale}
            fontSize="2rem"
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
