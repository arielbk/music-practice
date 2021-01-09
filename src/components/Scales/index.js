import {
  Button,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/react';
import { useState } from 'react';
import { FaPuzzlePiece } from 'react-icons/fa';
import styled from '@emotion/styled';
import SvgCircleOfFifths from '../shared/CircleOfFifths';
import MidiPlayer from '../shared/MidiPlayer';
import MusicSheet from '../shared/MusicSheet';
import ScrollableDisplay from '../shared/ScrollableDisplay';
import ScaleOrder from './ScaleOrder';
import useScale from './useScale';

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
  const [isCofOpen, setIsCofOpen] = useState(false);
  const {
    majorOrder,
    setMajorOrder,
    minorOrder,
    setMinorOrder,
    scale,
    scaleIndex,
    previousScale,
    nextScale,
    scaleCount,
    scaleNotes,
  } = useScale();

  return (
    <Container>
      <Settings>
        <ScaleOrder
          majorOrder={majorOrder}
          setMajorOrder={setMajorOrder}
          minorOrder={minorOrder}
          setMinorOrder={setMinorOrder}
        />
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
          totalItems={scaleCount}
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
