import { useState, useEffect, useCallback } from 'react';
import shuffleArray from '../../utils/shuffleArray';
import { majorScales, minorScales } from './notes';

const orders = {
  0: {
    major: 'clockwise',
    minor: 'counterclockwise',
  },
  1: {
    major: 'shuffle',
    minor: 'shuffle',
  },
  2: {
    major: 'clockwise',
    minor: 'off',
  },
  3: {
    major: 'shuffle',
    minor: 'off',
  },
  4: {
    major: 'off',
    minor: 'counterclockwise',
  },
  5: {
    major: 'off',
    minor: 'shuffle',
  },
};

export default function useScale() {
  // array of scale name strings
  const [scaleSequence, setScaleSequence] = useState(null);
  // number index on scale sequence
  const [scaleIndex, setScaleIndex] = useState(0);
  // string name of current scale
  const [scale, setScale] = useState(null);
  // string notation for the current cale
  const [scaleNotes, setScaleNotes] = useState(null);

  // setting for how the major sequence is generated
  const [majorOrder, setMajorOrder] = useState('clockwise');
  // setting for how the minor sequence is generated
  const [minorOrder, setMinorOrder] = useState('clockwise');

  // generate a new sequence of scales
  const sequenceScales = useCallback(() => {
    setScaleIndex(0);
    const majorNames = Object.keys(majorScales);
    const minorNames = Object.keys(minorScales);

    let scaleNames = [];

    if (majorOrder === 'clockwise')
      majorNames.forEach((scale) => scaleNames.push(scale));
    else if (majorOrder === 'counterclockwise')
      majorNames.reverse().forEach((scale) => scaleNames.push(scale));
    else if (majorOrder === 'shuffle')
      shuffleArray(majorNames).forEach((scale) => scaleNames.push(scale));

    if (minorOrder === 'clockwise')
      minorNames.forEach((scale) => scaleNames.push(scale));
    else if (minorOrder === 'counterclockwise')
      minorNames.reverse().forEach((scale) => scaleNames.push(scale));
    else if (minorOrder === 'shuffle')
      shuffleArray(minorNames).forEach((scale) => scaleNames.push(scale));

    setScaleSequence(scaleNames);
  }, [majorOrder, minorOrder]);

  // go to next scale or regenerate
  const nextScale = () => {
    if (!scaleSequence || scaleIndex === scaleSequence.length - 1)
      return sequenceScales();
    setScaleIndex(scaleIndex + 1);
  };
  // go to previous scale or do nothing
  const previousScale = () => {
    if (!scaleIndex) return;
    setScaleIndex(scaleIndex - 1);
  };

  // set the current scale name
  useEffect(() => {
    if (scaleSequence) setScale(scaleSequence[scaleIndex]);
  }, [scaleSequence, scaleIndex]);

  // set the scale notes once scale name changes
  useEffect(() => {
    if (!scale) return;
    const scales = { ...majorScales, ...minorScales };
    let ourScale = scales[scale].split(' ');
    let reverseScale = ourScale.reverse();
    reverseScale.shift();
    setScaleNotes(`|${scales[scale]} ${reverseScale}|`);
  }, [scale]);

  // reshuffle the scale when settings change
  useEffect(() => sequenceScales(), [sequenceScales, majorOrder, minorOrder]);

  return {
    majorOrder,
    setMajorOrder,
    minorOrder,
    setMinorOrder,
    scale,
    scaleIndex,
    previousScale,
    nextScale,
    scaleNotes,
    scaleCount: scaleSequence?.length || 0,
  };
}
