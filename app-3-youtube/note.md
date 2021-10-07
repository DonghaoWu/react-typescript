1. type definition is valueable.

```ts
let name: string = 'google';
```

2. catch errors early in development.

3. typeScript working with React;

```bash
$ npx create-react-app --template typescript app-3-ytb
$ cd app-3-ytb
$ npm start
```

4. App.tsx

```tsx
import React, { useState } from 'react';
import './App.css';

function App() {
  const [number, setNumber] = useState(5);
  const changeNumber = () => {
    setNumber('10'); // error
  };
}
```

```tsx
const [number, setNumber] = useState<number>(5);
```

5. App.jsx

```tsx
function App() {
  const [people, setPeople] = useState([
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

  people.map((person) => {
    person.height;
  });
  return (
    <div>
      <h1>People Invited to my party</h1>
    </div>
  );
}
```

```tsx
import List from './components/List';
interface Istate {
  people: {
    name: string;
    age: number;
    url: string;
    note?: string;
  };
}

function App() {
  const [people, setPeople] = useState<Istate['people']>([
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

  return (
    <div>
      <h1>People Invited to my party</h1>
      <List people={people} />
      <AddToList people={people} setPeople={setPeople} />
    </div>
  );
}
```

5. List.tsx component.

```tsx
import React from 'react';

interface IProps {
  people: {
    name: string;
    age: number;
    url: string;
    note?: string;
  };
}

const List: React.FC<IProps> = ({ people }) => {
  const renderList = ():JSX.Element[] =>{
    return people.map((person) => {
      return <li className='List'><div className='List-header'>
        <img className='List-img' src={person.url}/>
        <h2>{person.name}</h2>
      </div>
      <p>{person.age} years old.</p>
      <p className='List-note'>{person.note}</p>
      </li>;
    }
  }

  return(
  <ul>
    {renderList()}
  </ul>
  )
};
```

6. paste the style in App.css

7. create a form.

- AddToList.tsx

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
    if (!input.name || !input.age || input.img) return;
    setPeople([
      ...people,
      {
        name: input.name,
        age: parseInt(input.age),
        url: input.img,
        note: input.note,
      },
    ]);
    setInput(
      name: '',
      age: '',
      img: '',
      note: '',
    )
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
        name="url"
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
