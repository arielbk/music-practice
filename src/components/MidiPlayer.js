import styled from 'styled-components';
import { Midi } from 'react-abc';

const MidiContainer = styled.div`
  width: 50%;
  margin: 2rem 0 5rem;
  background: #ccc;
  border-radius: 7px;
  overflow: hidden;
  filter: invert(1) brightness(4);
`;

export default function MidiPlayer({notation, bpm}) {
  return (
  <MidiContainer>
    <Midi key={[notation, bpm]} notation={notation} midiParams={{ qpm: bpm }} />
  </MidiContainer>
  )
}