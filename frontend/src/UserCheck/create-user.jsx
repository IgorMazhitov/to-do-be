import React, { useState } from 'react';

function CreateForm({ onSubmit }) {
  const [name, setName] = useState('');

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const url = `http://localhost:3033/todo/user?name=${name}`;
    const response = await fetch(url, {
      method: 'POST',
    });

    if (!response.ok) {
      alert(`Error: ${response.statusText}`);
      return;
    }

    const data = await response.json();

    if (!data.success) {
      alert(`Error: ${data.error}`);
      return;
    }

    console.log(data.user.username);

    onSubmit(data.user.username);
  };

  return (
    <form style={{ marginBottom: '20px' }}>
      <label style={{ marginRight: '10px' }}>
        Name:
        <input
          type="text"
          value={name}
          onChange={handleChange}
          style={{
            padding: '5px',
            borderRadius: '3px',
            border: '1px solid #ccc',
            fontSize: '16px',
          }}
        />
      </label>
      <button
        onClick={handleSubmit}
        style={{
          padding: '5px 10px',
          backgroundColor: 'lightblue',
          border: '1px solid gray',
          borderRadius: '3px',
          fontSize: '16px',
          cursor: 'pointer',
        }}
      >
        Submit
      </button>
    </form>
  );
}

export default CreateForm;
