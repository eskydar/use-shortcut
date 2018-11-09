# useShortcut react hook

Install it with yarn:

```
yarn add use-shortcut
```

Or with npm:

```
npm i use-shortcut --save
```

## Demo

The simplest way to start playing around with use-shortcut is with this CodeSandbox snippet:
https://codesandbox.io/s/jj8l8y0m79

```javascript
import React, { useState } from 'react';
import useShortcuts from 'use-shortcut';

export default function MyComponent() {
  const [activeKeys, isShortcut] = useShortcuts();
  const handleClick = () => {
    if (isShortcut('alt+shift')) {
      console.log('We have a shortcut pressed!');
    } else {
      console.log('This is a regular click');
    }
    console.log('Current active keys:', activeKeys);
  };

  return (
    <div className="App">
      <h1>Shortcut hook for React</h1>
      <h2>Allows you to easily check if a shortcut is currently pressed</h2>
      <button onClick={handleClick}>Press me (optionally with alt and shift pressed</button>
    </div>
  );
}
```
