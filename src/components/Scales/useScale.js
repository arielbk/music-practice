import { useState, useEffect, useCallback } from 'react';
import shuffleArray from '../../utils/shuffleArray';
import { majorScales, minorScales } from './notes';

export default function useScale() {
  // array of scale name strings
  const [scaleSequence, setScaleSequence] = useState(null);
  // number index on scale sequence
  const [scaleIndex, setScaleIndex] = useState(0);
  // string name of current scale
  const [scale, setScale] = useState(null);
  // string notation for the current cale
  const [scaleNotes, setScaleNotes] = useState(null);
  // setting for how the sequence is generated
  const [order, setOrder] = useState('0');

  // generate a new sequence of scales
  const sequenceScales = useCallback(() => {
    setScaleIndex(0);

    let scales;
    if (order === '0' || order === '1')
      scales = { ...majorScales, ...minorScales };
    if (order === '2' || order === '3') scales = { ...majorScales };
    if (order === '4' || order === '5') scales = { ...minorScales };
    const scaleNames = Object.keys(scales);

    const isShuffle = order === '1' || order === '3' || order === '5';
    const newScaleSequence = isShuffle ? shuffleArray(scaleNames) : scaleNames;

    setScaleSequence(newScaleSequence);
  }, [order]);

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
  useEffect(() => sequenceScales(), [sequenceScales, order]);

  return {
    order,
    setOrder,
    scale,
    scaleIndex,
    previousScale,
    nextScale,
    scaleNotes,
    scaleCount: scaleSequence?.length || 0,
  };
}
