import React, { useState } from 'react';

function EnterUser({ onSubmit }) {
  const [user, setUser] = useState('');

  const handleUserChange = (event) => {
    setUser(event.target.value);
  };

  const handleUserSubmit = async (event) => {
    event.preventDefault();

    try {
      const url = `http://localhost:3033/todo/user?name=${user}`;
      const response = await fetch(url, {
        method: 'GET', 
      });

      if (!response.ok) {
        alert(`Error: ${response.statusText}`);
        return;
      }

      const data = await response.json();

      if (!data.success) {
        alert(`Error: ${data.error}`);
        return;
      } else {
        console.log(data.user.username);
        onSubmit(data.user.username);
      }
    } catch (error) {
      alert('User already exists! Please enter a different username.');
      console.error(error);
    }
  };

  return (
    <form style={{ marginBottom: '20px' }}>
      <input
        type="text"
        value={user}
        onChange={handleUserChange}
        placeholder="Enter a username"
        style={{
          padding: '5px',
          marginRight: '10px',
          borderRadius: '3px',
          border: '1px solid #ccc',
          fontSize: '16px',
        }}
      />
      <button
        onClick={handleUserSubmit}
        type="submit"
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

export default EnterUser;

