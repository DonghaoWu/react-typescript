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
