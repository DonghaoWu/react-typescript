### Create a react app with typeScript.

- Two ways to add typeScript in useState.

```tsx
interface Istate {
  people: {
    name: string;
    age: number;
    url: string;
    note?: string;
  };
}
const [people, setPeople] = useState<Istate['people']>([]);
```

1. create a new react app.

```bash
$ npx create-react-app --template typescript app-3-ytb
$ cd app-3-ytb
$ npm start
```

2. Add basic set up in App.jsx

- App.tsx

```tsx
import React, { useState } from 'react';
import './App.css';
import List from './components/List';

export interface IState {
  people: {
    name: string;
    age: number;
    img: string;
    note?: string;
  }[];
}

function App() {
  const [people, setPeople] = useState<IState['people']>([
    {
      name: 'LeBron James',
      img: 'https://cdn.nba.com/headshots/nba/latest/1040x760/2544.png',
      age: 36,
      note: 'Allegeric to staying on the same team',
    },
    {
      name: 'Kobe',
      img: 'https://fullpresscoverage.com/wp-content/uploads/2020/01/101524695-457220551.jpg',
      age: 36,
    },
  ]);

  return (
    <div className="App">
      <h1>People invited to my party</h1>
      <List people={people} />
    </div>
  );
}

export default App;
```

- List.tsx

```tsx
import React from 'react';
import { IState as Props } from '../App';

interface IProps {
  people: Props['people'];
}

const List: React.FC<IProps> = ({ people }) => {
  const renderList = (): JSX.Element[] => {
    return people.map((person) => {
      return (
        <li className="List">
          <div className="List-header">
            <img className="List-img" src={person.url} alt={person.name} />
            <h2>{person.name}</h2>
          </div>
          <p>{person.age} years old.</p>
          <p className="List-note">{person.note}</p>
        </li>
      );
    });
  };
  return <ul>{renderList()}</ul>;
};

export default List;
```

3. 短期重点归类：

- 要求一：

```diff
+ 定义一个 interface，名字是 IState，其中一个 key 为 `people` 用来定义 useState 的参数，

+ `people` 是一个 array 定义，然后里面以 object 为单位

+ object 里面有 4 个 key，分别是 name，age，url， note。

+ name 是一个 string，age 是一个 number，url 是一个 string，note 不是必须的 key，如果有就是一个 string。
```

```tsx
export interface IState {
  people: {
    name: string;
    age: number;
    url: string;
    note?: string;
  }[];
}
```

- 要求二：

```diff
+ 把上面定义的 interface 中的 people 应用在 useState 的 people上。
```

```tsx
const [people, setPeople] = useState<IState['people']>([
  {
    name: 'LeBron James',
    url: '',
    age: 36,
    note: 'Allegeric to staying on the same team',
  },
  {
    name: 'Kobe',
    url: '',
    age: 36,
  },
]);
```

- 要求三：

```diff
+ 在子组件 List 中定义一个 interface，用来定义接收的 props，使用从 App 中 import 过来的 IState，并新建一个 key，为 people 对应 IState 的 `people`.

+ 给 List 加一个参数定义。
```

```tsx
import React from 'react';
import { IState as Props } from '../App';

interface IProps {
  people: Props['people'];
}

const List: React.FC<IProps> = ({ people }) => {
  return <ul></ul>;
};

export default List;
```

- 要求四：

```diff
+ 在 List 中加一个 method，名字是 renderList，定义返回的结果是一个 `JSX.Element`
```

```tsx
const renderList = (): JSX.Element[] => {
  return people.map((person) => {
    return (
      <li className="List">
        <div className="List-header">
          <img className="List-img" src={person.url} alt={person.name} />
          <h2>{person.name}</h2>
        </div>
        <p>{person.age} years old.</p>
        <p className="List-note">{person.note}</p>
      </li>
    );
  });
};
```

---

4. Add a new component, call `AddToList`.

- import AddToList in App.tsx

- render AddToList in App, pass `state and state method` to AddToList.

```tsx
import AddToList from './components/AddToList';

<AddToList people={people} setPeople={setPeople} />;
```

5. add code in `AddToList`

```tsx
import React, { useState } from 'react';

import { IState as Props } from '../App';

interface IProps {
  people: Props['people'];
  setPeople: React.Dispatch<React.SetStateAction<Props['people']>>;
}

const AddToList: React.FC<IProps> = ({ people, setPeople }) => {
  const [input, setInput] = useState({
    name: '',
    age: '',
    img: '',
    note: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleClick = (): void => {
    if (!input.name || !input.age || !input.img) return;
    setPeople([
      ...people,
      {
        name: input.name,
        age: parseInt(input.age),
        img: input.img,
        note: input.note,
      },
    ]);
    setInput({
      name: '',
      age: '',
      img: '',
      note: '',
    });
  };

  return (
    <div className="AddToList">
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={input.name}
        onChange={handleChange}
        className="AddToList-input"
      />
      <input
        type="text"
        placeholder="Age"
        name="age"
        value={input.age}
        onChange={handleChange}
        className="AddToList-input"
      />
      <input
        type="text"
        placeholder="Image Url"
        name="img"
        value={input.img}
        onChange={handleChange}
        className="AddToList-input"
      />
      <textarea
        placeholder="Note"
        name="note"
        value={input.note}
        onChange={handleChange}
        className="AddToList-input"
      />
      <button className="AddToList-btn" onClick={handleClick}>
        Add to List
      </button>
    </div>
  );
};

export default AddToList;
```

6. 短期总结：

- 要求一：

```diff
+ 建立一个 interface，用来给 AddToList 接收 props，名字也是叫 `IProps`

+ IProps 有两部分，一部分是用来定义 people，另一个部分是用来预定义 setPeople

+ 把上面定义的 interface 应用在 AddToList 中
```

```tsx
import { IState as Props } from '../App';

interface IProps {
  people: Props['people'];
  setPeople: React.Dispatch<React.SetStateAction<Props['people']>>;
}

const AddToList: React.FC<IProps> = ({ people, setPeople }) => {};
```

- 要求二：

```diff
+ 在 input 的双向绑定中，也就是 handleChange 函数中，出现一个 e 参数，定义为 `React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>`

+ 函数 handleChange 和 handleClick 都是定义为无返回类型 `void`
```

```tsx
const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
): void => {
  setInput({ ...input, [e.target.name]: e.target.value });
};

const handleClick = (): void => {
  if (!input.name || !input.age || !input.img) return;
  setPeople([
    ...people,
    {
      name: input.name,
      age: parseInt(input.age),
      img: input.img,
      note: input.note,
    },
  ]);
  setInput({
    name: '',
    age: '',
    img: '',
    note: '',
  });
};
```

7. add styling.

- App.css

```css
.App {
  text-align: center;
}

.App-logo {
  height: 40vmin;
  pointer-events: none;
}

@media (prefers-reduced-motion: no-preference) {
  .App-logo {
    animation: App-logo-spin infinite 20s linear;
  }
}

.App-header {
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
}

.App-link {
  color: #61dafb;
}

@keyframes App-logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.List {
  list-style: none;
  display: flex;
  align-items: center;
  width: 50rem;
  margin: 0rem auto;
  border: 0.1rem solid rgba(0, 0, 0, 0.233);
  padding: 1rem;
  justify-content: space-between;
}

.List-header {
  display: flex;
  align-items: center;
}

.List-header h2 {
  color: rgb(37, 36, 36);
}

.List-img {
  width: 4rem;
  height: 4rem;
  border-radius: 100%;
  margin-right: 0.5rem;
}

.List-note {
  width: 30%;
  text-align: left;
}

.AddToList {
  display: flex;
  flex-direction: column;
  width: 30rem;
  margin: 5rem auto;
}

.AddToList-input {
  padding: 0.5rem;
  font-size: 1rem;
  margin: 0.3rem 0rem;
}

.AddToList-btn {
  padding: 0.5rem;
  cursor: pointer;
  background-color: #0b5468;
  font-weight: 700;
  color: white;
  border: none;
}
```
