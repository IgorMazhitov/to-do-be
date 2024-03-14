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
    <form>
      <label>
        Name:
        <input type="text" value={name} onChange={handleChange} />
      </label>
      <button onClick={handleSubmit}>Submit</button>
    </form>
  );
}

export default CreateForm;
