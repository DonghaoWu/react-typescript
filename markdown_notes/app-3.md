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

---

6/25:

1. code

```js
import * as esbuild from 'esbuild-wasm';

export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        console.log('onResole', args);
        return { path: args.path, namespace: 'a' };
      });

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log('onLoad', args);

        if (args.path === 'index.js') {
          return {
            loader: 'jsx',
            contents: `
              import message from 'tiny-test-pkg';
              console.log(message);
            `,
          };
        }
      });
    },
  };
};
```

2. ESbuild plugin

- ./src/plugins/unpkg-path-plugin

```js

```

- index.tsx

```ts
import * as esbuild from 'esbuild-wasm';
import ReactDOM from 'react-dom';
import { useState, useEffect, useRef } from 'react';

import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';

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

    // const result = await ref.current.transform(input, {
    //   loader: 'jsx',
    //   target: 'es2015',
    // });

    const result = await ref.current.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin()],
    });

    // console.log(result);

    setCode(result.outputFIles[0].text);
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

3. Dynamic fetching and loading of NPM modules

-

```ts
import * as esbuild from 'esbuild-wasm';

export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        console.log('onResole', args);
        return { path: args.path, namespace: 'a' };
      });

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log('onLoad', args);

        if (args.path === 'index.js') {
          return {
            loader: 'jsx',
            contents: `
              import message from 'tiny-test-pkg';
              console.log(message);
            `,
          };
        }
      });
    },
  };
};
```

- 6/27

1. dynamically fetching modules

```js
import * as esbuild from 'esbuild-wasm';
import axios from 'axios';

export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        console.log('onResole', args);
        if (args.path === `index.js`) {
          return { path: args.path, namespace: 'a' };
        }

        if (args.path.includes('./') || args.path.includes('../')) {
          return {
            namespace: 'a',
            path: new URL(
              args.path,
              'https://unpkg.com' + args.resolverDir + '/'
            ).href,
          };
        }
        return {
          namespace: 'a',
          path: `https://unpkg.com/${args.path}`,
        };
        // else if(args.path === 'tiny-test-pkg'){
        //     return(path:'', namespace:'a')
        // }
      });

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log('onLoad', args);

        if (args.path === 'index.js') {
          return {
            loader: 'jsx',
            contents: `
              const message = require('react-dom');
              console.log(message);
            `,
            resolveDir: new URL('./', request.responseURl).pathname,
          };
        }

        const { data } = await axios.get(args.path);
        return {
          loader: 'jsx',
          contents: data,
        };
      });
    },
  };
};
```

```bash
$ npm i axios
```

- defines during bundling

```js
import * as esbuild from 'esbuild-wasm';
import ReactDOM from 'react-dom';
import { useState, useEffect, useRef } from 'react';

import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';

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

    // const result = await ref.current.transform(input, {
    //   loader: 'jsx',
    //   target: 'es2015',
    // });

    const result = await ref.current.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin()],
      define:{
          'process.env.NODE_ENV':'"production"',
          global:'window'
      }
    });

    // console.log(result);

    setCode(result.outputFIles[0].text);
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

- package versioning

```js
import * as esbuild from 'esbuild-wasm';
import axios from 'axios';

export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        console.log('onResole', args);
        if (args.path === `index.js`) {
          return { path: args.path, namespace: 'a' };
        }

        if (args.path.includes('./') || args.path.includes('../')) {
          return {
            namespace: 'a',
            path: new URL(
              args.path,
              'https://unpkg.com' + args.resolverDir + '/'
            ).href,
          };
        }
        return {
          namespace: 'a',
          path: `https://unpkg.com/${args.path}`,
        };
        // else if(args.path === 'tiny-test-pkg'){
        //     return(path:'', namespace:'a')
        // }
      });

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log('onLoad', args);

        if (args.path === 'index.js') {
          return {
            loader: 'jsx',
            contents: `
              import React from 'react@16.0.0';
              console.log(message);
            `,
            resolveDir: new URL('./', request.responseURl).pathname,
          };
        }

        const { data } = await axios.get(args.path);
        return {
          loader: 'jsx',
          contents: data,
        };
      });
    },
  };
};
```

3. Caching

- localforage, indexDB

```bash
$ npm i localforage
```

- implementing a caching layer

```js
import * as esbuild from 'esbuild-wasm';
import axios from 'axios';
import localForage from 'localforage';

const fileCache = localForage.createInstance({
  name: 'filecache',
});

// (async () => {
//   await fileCache.setItem('color', 'red');

//   const color = await fileCache.getItem('color');
//   console.log(color)
// })();

export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        console.log('onResole', args);
        if (args.path === `index.js`) {
          return { path: args.path, namespace: 'a' };
        }

        if (args.path.includes('./') || args.path.includes('../')) {
          return {
            namespace: 'a',
            path: new URL(
              args.path,
              'https://unpkg.com' + args.resolverDir + '/'
            ).href,
          };
        }
        return {
          namespace: 'a',
          path: `https://unpkg.com/${args.path}`,
        };
        // else if(args.path === 'tiny-test-pkg'){
        //     return(path:'', namespace:'a')
        // }
      });

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log('onLoad', args);

        if (args.path === 'index.js') {
          return {
            loader: 'jsx',
            contents: `
              import React from 'react@16.0.0';
              console.log(message);
            `,
          };
        }

        const cachedResult =
          (await fileCache.getItem) < esbuild.OnLoadResult > args.path;

        if (cachedResult) {
          return cachedResult;
        }

        const { data, request } = await axios.get(args.path);

        const result: esbuild.OnLoadResult = {
          loader: 'jsx',
          contents: data,
          resolveDir: new URL('./', request.responseURl).pathname,
        };

        await fileCache.setItem(args.path, result);
        return result;
      });
    },
  };
};
```
