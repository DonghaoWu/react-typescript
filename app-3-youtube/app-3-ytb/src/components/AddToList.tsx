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
