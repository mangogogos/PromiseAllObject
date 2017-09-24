# PromiseAllObject
Adds Promise.allObj which is like Promise.all but for objects. TypeScript supported

TODO:
Right now everything is defined in a single TypeScript file. I'll need to investigate the best distribution options for tsconfig.json for general NPM consumption.

Usage:

````JavaScript
import 'promise-all-object';

const e: Promise<string> = new Promise((resolve) => resolve('banana'));

Promise.allObj({
  a: 1,
  b: 'abc',
  c: Promise.resolve(true),
  d: new Promise((resolve) => setTimeout(() => resolve({key: 'value'))) as Promise<{key: string}>,
  e: e,
})
  .then((val) => {
      let a = val.a; // number
      let b: val.b; // string
      let c: val.c; // boolean
      let d: val.d; // {key: string}
      let e: val.e; // string
  })
  .catch(err => console.warn('caught', err));
````
