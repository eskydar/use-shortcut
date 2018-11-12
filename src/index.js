import { useState, useEffect } from 'react';

import keycodes from './keycodes';

const useShortcut = () => {
  const [newActiveKeys, setNewActiveKeys] = useState([]);

  const handleKeydown = (e) => {
    if (newActiveKeys.indexOf(keycodes[e.keyCode]) > -1) return;
    setNewActiveKeys([...newActiveKeys, keycodes[e.keyCode]]);
  };

  const handleKeyup = (e) => setNewActiveKeys([...newActiveKeys.filter((key) => key !== keycodes[e.keyCode])]);

  const isShortcut = (shortcut) => shortcut.split('+').every((key) => newActiveKeys.indexOf(key) > -1);

  useEffect(() => {
    window.addEventListener('keydown', handleKeydown);
    window.addEventListener('keyup', handleKeyup);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
      window.removeEventListener('keyup', handleKeyup);
    };
  });

  return [newActiveKeys, isShortcut];
};

export default useShortcut;
