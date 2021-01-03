import {
  Button,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import { FaPuzzlePiece } from 'react-icons/fa';
import styled from '@emotion/styled';
import SvgCircleOfFifths from '../shared/CircleOfFifths';
import MidiPlayer from '../shared/MidiPlayer';
import MusicSheet from '../shared/MusicSheet';
import ScrollableDisplay from '../shared/ScrollableDisplay';
import { majorScales, minorScales } from './notes';
import ScaleOrder from './ScaleOrder';

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
  const [scaleSequence, setScaleSequence] = useState(null);
  const [scaleIndex, setScaleIndex] = useState(0);
  const [scale, setScale] = useState(null);

  const [scaleNotes, setScaleNotes] = useState(null);

  const [isCofOpen, setIsCofOpen] = useState(false);
  const [order, setOrder] = useState('0');

  const sequenceScales = useCallback(() => {
    const scales = { ...majorScales, ...minorScales };
    const filtered = Object.keys(scales).filter((scale) => {
      if (order === '0' || order === '1') return true;
      if (order === '2' || order === '3') return !scale.includes('min');
      if (order === '4' || order === '5') return scale.includes('min');
      return false;
    });
    setScaleIndex(0);
    const isShuffle = order === '1' || order === '3' || order === '5';
    const newScaleSequence = isShuffle ? shuffleArray(filtered) : filtered;
    setScaleSequence(newScaleSequence);
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
    if (scaleSequence) setScale(scaleSequence[scaleIndex]);
  }, [scaleSequence, scaleIndex]);

  // set the scale notes
  useEffect(() => {
    if (!scale) return;
    const scales = { ...majorScales, ...minorScales };
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
        <ScaleOrder order={order} setOrder={setOrder} />
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

      {scale ? (
        <ScrollableDisplay
          currentIndex={scaleIndex}
          currentName={scale}
          onPrevious={previousScale}
          onNext={nextScale}
          totalItems={scaleSequence ? scaleSequence.length : 0}
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
