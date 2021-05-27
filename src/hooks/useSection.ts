import { useEffect, useState } from 'react';
import { Line } from '../types';
import useLine from './useLine';

const useSection = () => {
  const [currentLine, setCurrentLine] = useState('');

  useEffect(() => {}, [currentLine]);
  return { currentLine, setCurrentLine };
};

export default useSection;
