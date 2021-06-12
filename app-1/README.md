# React-typeScript(part 1)

### `Key Word: .`

- #### Click here: [BACK TO NAVIGASTION]()

## `Section: React-typeScript`(Basic)

### `Summary`: In this documentation, we learn basic React typeScript.

### `Check Dependencies & Tools:`

-

#### `本章背景：`

-

### <span id="1.0">`Brief Contents & codes position`</span>

- #### Click here: [BACK TO NAVIGASTION]()

- [1.1 Environment set up.](#1.1)
- [1.2 index.tsx.](#1.2)
- [1.3 Passing props from parent to child component.](#1.3)
- [1.4 React hooks.](#1.4)
- [1.5 Class Components.](#1.5)

---

### <span id="1.1">`Step1: Environment set up.`</span>

- #### Click here: [BACK TO CONTENT](#1.0)

1. Install dependencies.

```bash
$ npm i -g typescript ts-node
$ npx create-react-app <app-name> --template typescript
```

2. Install prettier extention.

- Set up Prettier
  - code => prefences => setting => search: `default formatter`
  - code => prefences => setting => search: format on save => check that( run prettier on save)

3. Update VSCode and typeScript React version.

4. Basic compile commands.

```bash
$ tsc index.tsx # compile and get a new index.js file
$ node.index.js

$ ts-node index.tsx # one line command
```

#### `Comment:`

1.

### <span id="1.2">`Step2: index.tsx`</span>

- #### Click here: [BACK TO CONTENT](#1.0)

- index.tsx

```ts
import ReactDOM from 'react-dom';
import './styles.css';
import Parent from './Components/FC_parent-child/Parent';
import GuestList from './Components/FC_react-hook/GuestList';
import UserSearch from './Components/FC_react-hook/UserSearch';
import UserSearchRef from './Components/FC_react-ref/UserSearch-ref';
import UserSearchCC from './Components/CC_state/UserSearchCC';

const users = [
  { name: 'Sarah', age: 20 },
  { name: 'Alex', age: 20 },
  { name: 'Michael', age: 20 },
];

const App = () => {
  return (
    <div>
      <h1> Simple React typeScript demos</h1>
      <div className="demo-content">
        <h4>Functional component: Parent to Child</h4>
        <Parent />
      </div>
      <div className="demo-content">
        <h4>Functional component: React hooks</h4>
        <GuestList />
        <UserSearch />
      </div>
      <div className="demo-content">
        <h4>Functional component: React ref</h4>
        <UserSearchRef />
      </div>
      <div className="demo-content">
        <h4>Class component: React state</h4>
        <UserSearchCC users={users} />
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
```

#### `Comment:`

1.

### <span id="1.3">`Step3: Passing props from parent to child component.`</span>

- #### Click here: [BACK TO CONTENT](#1.0)

1. ./src/Components/FC_parent-child/Parent.tsx

```ts
import { ChildAsFC } from './Child';

const Parent = () => {
  return (
    <ChildAsFC color="red" handleClick={() => console.log('Clicked')}>
      hello
    </ChildAsFC>
  );
};

export default Parent;
```

2. ./src/Components/FC_parent-child/Parent.tsx

```ts
interface ChildProps {
  color: string;
  handleClick: () => void;
}

export const ChildAsFC: React.FC<ChildProps> = ({
  color,
  handleClick,
  children,
}) => {
  return (
    <div>
      <p>{color}</p>
      <button onClick={handleClick}>Click me.</button>
    </div>
  );
};
```

#### `Comment:`

1. 传递参数的步骤：

```diff
+ 父组件传递参数
+ 子组件定义 interface
+ 子组件应用 interface
```

2. 关键语句。

```jsx
<ChildAsFC color="red" handleClick={() => console.log('Clicked')}>

interface ChildProps {
  color: string;
  handleClick: () => void;
}

export const ChildAsFC: React.FC<ChildProps> = ({})
```

### <span id="1.4">`Step4: React hooks.`</span>

- #### Click here: [BACK TO CONTENT](#1.0)

1. ./src/Components/FC_react-hook/GuestList.tsx

```ts
import { useState } from 'react';

export const GuestList: React.FC = () => {
  const [name, setName] = useState('');
  const [guests, setGuests] = useState<string[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleClick = () => {
    setName('');
    setGuests([...guests, name]);
  };

  return (
    <div>
      <h3>Guest List</h3>
      <ul>
        {guests.map((guest) => {
          return <li key={guest}>{guest}</li>;
        })}
      </ul>

      <input value={name} onChange={handleChange} />

      <button onClick={handleClick}>Add Guest</button>
    </div>
  );
};

export default GuestList;
```

2. ./src/Components/FC_react-hook/UserSearch.tsx

```ts
import { useState } from 'react';

const users = [
  { name: 'Sarah', age: 20 },
  { name: 'Alex', age: 20 },
  { name: 'Michael', age: 20 },
];

const UserSearch: React.FC = () => {
  const [name, setName] = useState('');
  const [user, setUser] = useState<{ name: string; age: number } | undefined>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleClick = () => {
    const foundUser = users.find((user) => {
      return user.name === name;
    });
    setUser(foundUser);
  };

  return (
    <div>
      <h3>User Search</h3>

      <input value={name} onChange={handleChange} />

      <button onClick={handleClick}>Find User</button>
      <div>
        {user ? (
          <div>
            <p>User name:{user.name}</p>
            <p>User age:{user.age}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default UserSearch;
```

3. ./src/Components/FC_react-ref/UserSearch-ref.tsx

```ts
import { useState, useRef, useEffect } from 'react';

const users = [
  { name: 'Sarah', age: 20 },
  { name: 'Alex', age: 20 },
  { name: 'Michael', age: 20 },
];

const UserSearchRef: React.FC = () => {
  const [name, setName] = useState('');
  const [user, setUser] = useState<{ name: string; age: number } | undefined>();

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!inputRef.current) return;
    inputRef.current.focus();
  }, []);

  const handleClick = () => {
    const foundUser = users.find((user) => {
      return user.name === name;
    });
    setUser(foundUser);
  };

  return (
    <div>
      <h3>User Search</h3>
      <input
        ref={inputRef}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleClick}>Find User</button>
      <div>
        {user ? (
          <div>
            <p>User name:{user.name}</p>
            <p>User age:{user.age}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default UserSearchRef;
```

#### `Comment:`

1. 常见类型定义：

```ts
// useState 数组
const [guests, setGuests] = useState<string[]>([]);

// useState 对象
const [user, setUser] = useState<{ name: string; age: number } | undefined>();

// handleChange, 输入事件 --- event
const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  setName(event.target.value);
};
```

2. 关于 ref 的用法：

```ts
import { useRef, useEffect } from 'react';

const [name, setName] = useState('');
const inputRef = useRef<HTMLInputElement | null>(null);

useEffect(() => {
  if (!inputRef.current) return;
  inputRef.current.focus();
}, []);

<input ref={inputRef} value={name} onChange={(e) => setName(e.target.value)} />;
```

- 通过上面的额设置之后，在 input 输入的东西自动填入到 useState 的 name 中。

3. 关于 ref 的用法链接：

- [form - useRef](https://github.com/DonghaoWu/firebase-auth-demo-heroku/blob/main/src/components/Signin.js)

  ```js
  const emailRef = useRef();

  async function handelSubmit(e) {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      await signin(emailRef.current.value, passwordRef.current.value);
      history.push('/');
    } catch (error) {
      setError(`Failed to sign in.`);
    }
    setLoading(false);
  }

  <Form.Control type="email" ref={emailRef} required />;
  ```

- [form - basic](https://github.com/DonghaoWu/stock-application-heroku/blob/master/client/src/components/auth/Login.js)

  ```js
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  <input
    type="email"
    placeholder="Email Address"
    value={email}
    name="email"
    onChange={(e) => handleChange(e)}
    required
  />;
  ```

### <span id="1.5">`Step5: Class Component.`</span>

- #### Click here: [BACK TO CONTENT](#1.0)

- ./src/Components/CC_state/UserSearchCC.tsx

```ts
import { Component } from 'react';

interface User {
  name: string;
  age: number;
}

interface UserSearchProps {
  users: User[];
}

interface UserSearchState {
  name: string;
  user: User | undefined;
}

class UserSearchCC extends Component<UserSearchProps> {
  state: UserSearchState = {
    name: '',
    user: undefined,
  };

  onClick = () => {
    const foundUser = this.props.users.find((user) => {
      return user.name === this.state.name;
    });

    this.setState({ user: foundUser });
  };

  render() {
    const { name, user } = this.state;

    return (
      <div>
        <h3>User Search</h3>
        <input
          value={name}
          onChange={(e) => this.setState({ name: e.target.value })}
        />
        <button onClick={this.onClick}>Find User</button>
        <div>
          {user ? (
            <div>
              <p>User name:{user.name}</p>
              <p>User age:{user.age}</p>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default UserSearchCC;
```

#### `Comment:`

1. interface 的嵌套使用

```ts
interface User {
  name: string;
  age: number;
}

interface UserSearchProps {
  users: User[];
}

interface UserSearchState {
  name: string;
  user: User | undefined;
}
```

2. state 的 interface 的引用

```js
state: UserSearchState = {
  name: '',
  user: undefined,
};
```

3. class component 接受参数

```ts
class UserSearchCC extends Component<UserSearchProps> {}
```

- #### Click here: [BACK TO CONTENT](#1.0)
- #### Click here: [BACK TO NAVIGASTION]()
