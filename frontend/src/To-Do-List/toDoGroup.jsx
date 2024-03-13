import React, { useState, useEffect } from 'react';

const ToDoGroups = (username) => {
  const [groups, setGroups] = useState([]);
  const [showAll, setShowAll] = useState(false);

  const fetchToDoGroups = async () => {
    let url = 'http://localhost:3033/todo/task';
    if (username && !showAll) {
      url += `?username=testUser`;
    }

    const response = await fetch(url);
    const data = await response.json();
    setGroups(data);
  };

  useEffect(() => {
    fetchToDoGroups();
  }, [username, showAll]);

 
  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  return (
    <div>
      <h2>To-Do Groups</h2>
      <button onClick={toggleShowAll}>
        {showAll ? 'Show Only My Groups' : 'Show All Groups'}
      </button>
      <ul>
        {groups.map((group) => (
          <li key={group.id}>{group.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ToDoGroups;
