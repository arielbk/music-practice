import {
  Button,
  Heading,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Radio,
  RadioGroup,
  Stack,
} from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import { BiShuffle } from 'react-icons/bi';
import { FaPuzzlePiece } from 'react-icons/fa';
import styled from 'styled-components';
import SvgCircleOfFifths from './CircleOfFifths';
import MidiPlayer from './MidiPlayer';
import MusicSheet from './MusicSheet';
import ScrollableDisplay from './ScrollableDisplay';

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
  'E♭min': '_E2 F2 _G2 _A2 _B2 _c2 _d2 _e2',
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
  padding: 12rem 3rem 4rem;
  margin: 0 auto 3rem;
  color: #333;
  background: #fff;
  border-radius: 7px;
  box-shadow: 0 3px 30px rgba(0, 0, 0, 0.02);
`;

const Settings = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 6rem;
  color: #999;
  font-weight: 600;
  border-bottom: 1px solid #eee;
  margin-bottom: 4rem;
  background: #eee;
  border-radius: 7px 7px 0 0;
  width: 100%;
  box-sizing: border-box;
  position: absolute;
  left: 0;
  top: 0;
`;

export default function Scales() {
  const [scaleSequence, setScaleSequence] = useState();
  const [scaleIndex, setScaleIndex] = useState(0);
  const [scale, setScale] = useState();

  const [scaleNotes, setScaleNotes] = useState();

  const [isCofOpen, setIsCofOpen] = useState(false);
  const [isOrderOpen, setIsOrderOpen] = useState(false);
  const [order, setOrder] = useState('0');

  const sequenceScales = useCallback(() => {
    const filtered = Object.keys(scales).filter((scale) => {
      if (order === '0' || order === '1') return true;
      if (order === '2' || order === '3') return !scale.includes('min');
      if (order === '4' || order === '5') return scale.includes('min');
      return false;
    });
    setScaleIndex(0);
    const isShuffle = order === '1' || order === '3' || order === '5';
    setScaleSequence(isShuffle ? shuffleArray(filtered) : filtered);
  }, [order]);

  const nextScale = () => {
    if (!scaleSequence || scaleIndex === scaleSequence.length - 1)
      return sequenceScales();
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
  useEffect(() => sequenceScales(), [sequenceScales]);

  return (
    <Container>
      <Settings>
        <Button leftIcon={<BiShuffle />} onClick={() => setIsOrderOpen(true)}>
          Scale Order
        </Button>
        <Button leftIcon={<FaPuzzlePiece />} onClick={() => setIsCofOpen(true)}>
          Circle of Fifths
        </Button>
      </Settings>

      {/* circle of fifths dialog */}
      <Modal isOpen={isCofOpen} onClose={() => setIsCofOpen(false)} size="xl">
        <ModalOverlay />
        <ModalContent background="#fff" width="600px">
          <ModalCloseButton color="#000" />
          <SvgCircleOfFifths />
        </ModalContent>
      </Modal>

      {/* scale order modal */}
      <Modal
        isOpen={isOrderOpen}
        onClose={() => setIsOrderOpen(false)}
        size="xl"
      >
        <ModalOverlay />
        <ModalContent background="#fff" width="600px" px={16} py={8}>
          <ModalCloseButton color="#000" />
          <Heading size="md" mt={8}>
            Select the configuration in which scales should appear:
          </Heading>
          <RadioGroup onChange={setOrder} value={order}>
            <Stack py={8}>
              <Radio value="0">Major clockwise, minor counterclockwise</Radio>
              <Radio value="1">Major and minor shuffle</Radio>
              <Radio value="2">Major clockwise</Radio>
              <Radio value="3">Major shuffle</Radio>
              <Radio value="4">Minor counterclockwise</Radio>
              <Radio value="5">Minor shuffle</Radio>
            </Stack>
          </RadioGroup>
        </ModalContent>
      </Modal>

      {scale ? (
        <ScrollableDisplay
          currentIndex={scaleIndex}
          currentName={scale}
          onPrevious={previousScale}
          onNext={nextScale}
          totalItems={scaleSequence.length}
        />
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
