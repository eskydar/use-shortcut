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
import React from 'react';
import useShortcut from 'use-shortcut';

export default function MyComponent() {
  const [activeKeys, isShortcut] = useShortcut();
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
      <button onClick={handleClick}>Press me (optionally with alt and shift pressed</button>
    </div>
  );
}
```

You can also import `useShortcutEffect` like in the following example:

```javascript
import React from 'react';
import { useShortcutEffect } from 'use-shortcut';

export default function MyComponent() {
  useShortcutEffect(() => {
    console.log('Shortcut pressed');
  }, 'alt+1');
  
...
}
```
