1. preparation:

```bash
$ npm i -g typescript ts-node
$ npx create-react-app my-app --template typescript
```

2. .ts / .tsx

3. index.tsx
```js
import ReactDOM from 'react-dom';

const App = () => {
    return
    (
        <div>
            <h1> Hi there!</h1>
        </div>
    )
};

ReactDOM.render(
    <App />,
    document.querySelector('#root')
)
```

4. ./src/props/Parent.tsx

```js
import { Child } from './child';

const Parent = () => {
    return <Child color='red' onClick={()=>console.log('Clicked')}/>
};

export default Parent;
```

5. ./src/props/Child.tsx

```js
interface ChildProps {
    color: string;
    onClick:()=>void;
}

export const Child = ({ color, onClick }: ChildProps) => {
    return(
        <div>
            <h1>{color}</h1>
            <button onClick={onClick}>Click me</button>
        </div>;
    ) 
};
```

- 以上展示了父组件向子组件传递参数时使用的 typeScript

6. another style.`重点`

```js
interface ChildProps {
    color: string;
}

export const ChildAsFC:React.FC<ChildProps> = ({ color, onClick, children }) => {
    return <div>{color}</div>;
};
```

7. new syntax `非重点`

```js
import { Child } from './child';

const Parent = () => {
    return(
         <ChildAsFC color='red' onClick={()=>console.log('Clicked')}>
            hello
        </ChildAsFC>
    )
};

export default Parent;
```

8. state & typeScript `基本重点`

- GuestList.tsx
```js
import {useState} from 'react';

export const GuestList:React.FC = ()=>{
    const [name, setName] = useState('');
    const [guests, setGuests] = useState<string[]>([]);

    const handleChange = (e) =>{
        setName(e.target.value);
    }

    const handleClick = () =>{
        setName('');
        setGuests([...guests, name]);
    }

    return(
        <div>
            <h3>Guest List</h3>
            <ul>
                {
                    guests.map(guest => {
                        return <li key={guest}>{guest}</li>
                    })
                }
            </ul>

            <input value={name} onChange={handleChange}/>

            <button onClick={handleClick}>Add Guest</button>
        </div>
    ) 
}

export default GuestList;
```

- UserSearch.tsx `基本重点`
```js
import {useState} from 'react';

const users = {
    {
        name:Sarah,
        age:20
    },
    {
        name:Dio,
        age:50
    }
}

const UserSearch:React.FC = ()=>{
    const [name, setName] = useState('');
    const [user, setUser] = useState<{name:string, age:number} | undefined>();

    const handleChange = (e) =>{
        setName(e.target.value);
    }

    const handleClick = () =>{
        const foundUser = users.find((user) =>{
            return user.name === name;
        });

        setUser(foundUser);
    }

    return(
        <div>
        <h3>User Search</h3>

            <input value={name} onChange={handleChange}/>

            <button onClick={handleClick}>Find User</button>
            <div>
                {user && user.name}
                <br/>
                {user && user.age}
            </div>
        </div>
    ) 
}

export default UserSearch;
```

6/8: 

1. inline event handler

- EventComponent.tsx

```js
const EventComponent:React.FC = ()=>{
    const handleChange = ()=>{
        console.log(e)
    }

    return(
        <div>
            <input onChange={handleChange} />
        </div>
    )
}

export default EventComponent;
```

2. typing standalone event handlers
```js
const EventComponent:React.FC = ()=>{
    const handleChange = (event : React.ChangeEvent<HTMLInputElement>)=>{
        console.log(event.target.value)
    }

    return(
        <div>
            <input onChange={handleChange} />
        </div>
    )
}

export default EventComponent;
```

3. handling drag events.
```js
const EventComponent:React.FC = ()=>{

    const handleChange = (event : React.ChangeEvent<HTMLInputElement>)=>{
        console.log(event.target.value)
    }

    const onDragStart = (event : React.DragEvent<HTMLDivElement>)=>{
        console.log('I am being dragged.', event)
    };

    return(
        <div>
            <input onChange={handleChange} />
            <div draggable onbDragStart={onDragStart}>Drag me</div>
        </div>
    )
}

export default EventComponent;
```

3. TypeScript with Class Components.

- class, UserClass
```js
import {Component} from 'react';

interface User{
    name:string;
    age:number;
}

interface UserSearchProps{
    users:User[]
}

interface UserSearchState{
    name:string;
    user: User | undefined;
}

class UserSearch extends Component<UserSearchProps>{

    state: UserSearchState = {
        name:'',
        user:undefined
    };

    handleClick = () => {
        const foundUser = this.props.users.find((user)=>{
            return this.state.name === user.name
        });

        this.setState({user: foundUser});
    }

    render(){
        return(
            <div>
            <h3>User Search</h3>

                <input value={this.state.name} onChange={(e) =>this.setState({name:e.target.value})}/>

                <button onClick={this.handleClick}>Find User</button>
                <div>
                    {this.state.user && this.state.user.name}
                    <br/>
                    {this.state.user && this.state.user.age}
                </div>
            </div>
        )
    }
}

export default UserSearch;
```

4. Apply types to Refs.

- refs/UserSearch.tsx
```js
import { useState, useRef, useEffect } from 'react';

const users = [
  { name: 'Sarah', age: 20 },
  { name: 'Alex', age: 20 },
  { name: 'Michael', age: 20 },
];

const UserSearch: React.FC = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [name, setName] = useState('');
  const [user, setUser] = useState<{ name: string; age: number } | undefined>();

  useEffect(() => {
    if (!inputRef.current) {
      return;
    }

    inputRef.current.focus();
  }, []);

  const onClick = () => {
    const foundUser = users.find((user) => {
      return user.name === name;
    });

    setUser(foundUser);
  };

  return (
    <div>
      User Search
      <input
        ref={inputRef}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={onClick}>Find User</button>
      <div>
        {user && user.name}
        {user && user.age}
      </div>
    </div>
  );
};

export default UserSearch;
```

- next: implement the first app, show some usual samples.