import { useState } from 'react';
import styled from 'styled-components';
import { Midi } from 'react-abc';

const Container = styled.div`
  display: flex;
  justify-content: center;
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
      <form>
        <label htmlFor="bpm" style={{ marginRight: 16, marginLeft: 32 }}>
          BPM:
        </label>
        <input
          id="bpm"
          name="bpm"
          type="number"
          value={bpm}
          onChange={(e) => setBpm(e.target.value)}
        />
      </form>
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
