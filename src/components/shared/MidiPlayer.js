import { Input, InputGroup, InputLeftAddon } from '@chakra-ui/react';
import { useState } from 'react';
import { Midi } from 'react-abc';
import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  form {
    margin-right: 2rem;
    padding: 2rem 1rem;
    top: -1rem;
    position: relative;
  }
`;

const MidiControls = styled.div`
  width: 50%;
  margin: 4rem 0 5rem;
  background: #ccc;
  border-radius: 7px;
  overflow: hidden;
  filter: invert(1) brightness(4);
`;

export default function MidiPlayer({ notation }) {
  const [bpm, setBpm] = useState(180);
  return (
    <Container>
      <InputGroup size="sm" width={140} mb="1rem" mr="1rem">
        <InputLeftAddon fontWeight="800">BPM</InputLeftAddon>
        <Input
          type="number"
          onChange={(e) => setBpm(e.target.value)}
          min={0}
          value={bpm}
        />
      </InputGroup>
      <MidiControls>
        <Midi
          key={[notation, bpm]}
          notation={notation}
          midiParams={{ qpm: bpm }}
        />
      </MidiControls>
    </Container>
  );
}
