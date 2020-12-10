import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { IconButton } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { AiOutlineStepBackward, AiOutlineStepForward } from 'react-icons/ai';

const Container = styled.div`
  width: 800px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  margin: 0 auto 4rem;
`;

const Wrapper = styled.div`
  position: relative;
  height: 280px;
  width: 280px;
`;

const Square = styled(motion.div)`
  position: absolute;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background: #fff;
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

const left = { x: -50, y: 20, opacity: 0, rotate: -15 };
const center = { x: 0, y: 0, opacity: 1, rotate: 0 };
const right = { x: 50, y: 20, opacity: 0, rotate: 15 };

export default function ScrollableDisplay({
  currentIndex,
  currentName,
  totalItems,
  onPrevious,
  onNext,
}) {
  const [lastTransition, setLastTransition] = useState('next');

  const handlePrevious = () => {
    console.log('prev');
    onPrevious();
    setLastTransition('prev');
  };
  const handleNext = () => {
    console.log('next');
    onNext();
    setLastTransition('next');
  };

  useEffect(() => {
    // todo: add intersection observer so that this is only when in viewport
    // todo: this has dependency on constantly changing functions
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowLeft') handlePrevious();
      if (e.key === 'ArrowRight') handleNext();
    };
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [onPrevious, onNext]);

  return (
    <Container>
      <IconButton
        icon={<AiOutlineStepBackward />}
        size="lg"
        isDisabled={currentIndex === 0}
        onClick={handlePrevious}
        fontSize="2rem"
      />
      <Wrapper>
        <AnimatePresence initial={false}>
          <Square
            key={currentIndex}
            initial={lastTransition === 'next' ? right : left}
            animate={center}
            // exit={lastTransition === 'next' ? left : right}
            exit={{ x: 0, y: -15, opacity: 0.5 }}
          >
            <h3>{currentName}</h3>
            <small>
              {currentIndex + 1} / {totalItems}
            </small>
          </Square>
        </AnimatePresence>
      </Wrapper>
      <IconButton
        icon={<AiOutlineStepForward />}
        size="lg"
        onClick={handleNext}
        fontSize="2rem"
      />
    </Container>
  );
}
