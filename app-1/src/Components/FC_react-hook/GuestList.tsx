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
