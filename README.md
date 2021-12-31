# sandbox-webworker

A js sandbox based on web worker

## Install

```bash
$ npm install sandbox-webworker
```

## Usage

```javascript
import sandbox from 'sandbox-webworker';

async function test(expression, scope) {
  return await sandbox.evaluate(expression, scope);
}

const expression = 'a+b';
const scope = { a: 1, b: 2 };
test(expression, scope)
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.log(err);
  });
```

## Licence

MIT
