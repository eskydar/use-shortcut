import { useState, useEffect } from 'react';

import keycodes from './keycodes';

const getKeyName = (code) => keycodes[code];

export const useShortcutEffect = (callback, shortcut) => {
  const [activeKeys, isShortcut] = useShortcut({ preventDefault: true });
  useEffect(
    () => {
      if (isShortcut(shortcut)) callback();
    },
    [activeKeys]
  );
};

const useShortcut = ({ preventDefault = false }) => {
  const [activeKeys, setActiveKeys] = useState([]);

  const doPreventDefault = e => {
    if (preventDefault) e.preventDefault();
  };

  const handleKeydown = e => {
    doPreventDefault(e);
    if (keycodes.hasOwnProperty(e.keyCode) && !~activeKeys.indexOf(getKeyName(e.keyCode))) {
      setActiveKeys([...activeKeys, getKeyName(e.keyCode)]);
    }
  };

  const handleKeyup = e => {
    doPreventDefault(e);
    setActiveKeys([...activeKeys.filter(key => key !== getKeyName(e.keyCode))]);
  };

  const isShortcut = shortcut => shortcut.split('+').every(key => ~activeKeys.indexOf(key));

  useEffect(() => {
    window.addEventListener('keydown', handleKeydown);
    window.addEventListener('keyup', handleKeyup);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
      window.removeEventListener('keyup', handleKeyup);
    };
  }, [activeKeys]);

  return [newActiveKeys, isShortcut];
};

export default useShortcut;
