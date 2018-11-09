import { useState, useEffect } from 'react';

const useShortcut = () => {
  const [newActiveKeys, setNewActiveKeys] = useState([]);

  const handleKeydown = (e) => {
    if (newActiveKeys.indexOf(e.key) > -1) return;
    setNewActiveKeys([...newActiveKeys, e.key.toLowerCase()]);
  };

  const handleKeyup = (e) => setNewActiveKeys([...newActiveKeys.filter((key) => key !== e.key.toLowerCase())]);

  const isShortcut = (shortcut) => shortcut.split('+').every((key) => newActiveKeys.indexOf(key.toLowerCase()) > -1);

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
