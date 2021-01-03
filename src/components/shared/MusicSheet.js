import { useState } from 'react';
import styled from '@emotion/styled';
import SheetMusic from 'react-sheet-music';

const SheetContainer = styled.div`
  position: relative;
  color: #000;
  ${(props) => (props.showNotes ? '' : `filter: blur(15px);`)}
  height: 130px;
  transition: 0.07s filter;
  margin: 4rem auto;
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

export default function MusicSheet({ notation }) {
  const [showNotes, setShowNotes] = useState(false);
  return (
    <div style={{ position: 'relative' }}>
      <SheetContainer
        showNotes={showNotes}
        onMouseEnter={() => setShowNotes(true)}
        onMouseLeave={() => setShowNotes(false)}
      >
        <SheetMusic notation={notation} />
      </SheetContainer>
      {showNotes ? '' : <HoverViewLabel>Hover to view sheet</HoverViewLabel>}
    </div>
  );
}
