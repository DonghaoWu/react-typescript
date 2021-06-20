1. transpiler => babel, babel is a jsx compiler.

2. codepen example

3. commands

```bash
$
```

4. js modules: common js /ES Modules

5.

```js
//ES module Syntax
import React from 'react';
export default App;

// after babel, to common js
const React = require('react');
module.exports = App;
```

6. 为什么要使用 webpack？

   - 因为单单是用 html + script + library（react） 是不能实现的，需要 webpack 把所有的 script + library 聚合成一个文件 =》 bundle.js 之后被 html 使用就可以运作了。

   -

7. 作者选择本地翻译/捆绑 js 文件，也就是 in-Brower bundling。

8. webpack 不能在 Browser 上运行。

9. a webpack replacement

- ESBuild library

```js

```

10. ESbuild app

```bash
$ npx create-react-app jbook --template typescript
$ cd jbook
$ npm i --save-exact esbuild-wasm@0.8.27
```

11. ./src/index.tsx

```ts
import * as esbuild from 'esbuild-wasm';
import ReactDOM from 'react-dom';
import { useState, useEffect, useRef } from 'react';

const App = () => {
  const ref = useRef<any>();
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');

  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: '/esbuild.wasm',
    });
  };

  useEffect(() => {
    startService();
  }, []);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleClick = async () => {
    if (!ref.current) {
      return;
    }

    const result = await ref.current.transform(input, {
      loader: 'jsx',
      target: 'es2015',
    });

    setCode(result.code);
  };

  return (
    <h1>
      <textarea value={input} onChange={handleChange}>
        {' '}
      </textarea>
      <div>
        <button onClick={handleClick}>Submit</button>
      </div>
      <pre>{code}</pre>
    </h1>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
```

12. Form Elements

```js

```

13. ESBuild

- node-modules/esbuild-wasm/esbuild.wasm => copy => paste in public folder =>

```js

```

14. transpiling => bundling => npm registry

15. 
```bash
$ npm view react dist.tarball
```

16. unpkg

    - `website/react`

6/19:

    - working on app3
