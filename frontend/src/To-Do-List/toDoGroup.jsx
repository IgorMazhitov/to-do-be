import React, { useState, useEffect } from 'react';

const ToDoGroups = ({ username }) => {
  const [groups, setGroups] = useState([]);
  const [newGroupName, setNewGroupName] = useState('');
  const [taskInputs, setTaskInputs] = useState({});

  const fetchToDoGroups = async () => {
    let url = 'http://localhost:3033/todo/task';
    if (username) {
      url += `?userName=${username}`;
    } else {
      alert('Please provide a username');
      return;
    }

    const response = await fetch(url);

    if (!response.ok) {
      alert('Error fetching to-do groups');
      return;
    }
    const data = await response.json();

    if (!data.success) {
      alert(`Error: ${data.error}`);
      return;
    } else {
      console.log(data);
      setGroups(data.groups);
    }
  };

  const handleCreateGroup = async (name) => {
    try {
      const url = `http://localhost:3033/todo/group?name=${name}&userName=${username}`;
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

      console.log(data, 'data from create group');
      setGroups([...groups, data.group]);
    } catch (error) {
      alert('Error creating group');
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const handleCreateTask = (e, groupId) => {
    e.preventDefault();
    // Use taskInputs object to create the task
    console.log(taskInputs);
    const url = `http://localhost:3033/todo/task`;
    const body = {
      groupId,
      name: taskInputs.taskName,
    };

    const response = fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
        });

    if (!response.ok) {
        alert(`Error: ${response.statusText}`);
        return;
        }

    const data = response.json();

    if (!data.success) {
        alert(`Error: ${data.error}`);
        return;
        }

    console.log(data.task);

    // Update the groups state with the new task
    const newGroups = groups.map((group) => {
      if (group.id === groupId) {
        return {
          ...group,
          tasks: [...group.tasks, data.task],
        };
      }
      return group;
    });

    setGroups(newGroups);

    // Clear the task input
    setTaskInputs((prevInputs) => ({
      ...prevInputs,
      taskName: '',
    }));
  };

  useEffect(() => {
    fetchToDoGroups();
  }, [username]);

  return (
    <div>
      <div>
        <label>Create To-Do Group</label>
        <input
          type="text"
          value={newGroupName}
          onChange={(e) => setNewGroupName(e.target.value)}
          placeholder="Enter a group name"
        />
        <button onClick={() => handleCreateGroup(newGroupName)}>Create</button>
      </div>

      <h2>To-Do Groups for ${username}</h2>
      <ul>
        {groups.map((group) => (
          <li key={group.id}>
            <h3>{group.name}</h3>
            <ul>
              {group.tasks.map((task) => (
                <li key={task.id}>{task.name}</li>
              ))}
            </ul>
            <form>
              <label>Create a task</label>
              <input
                type="text"
                name="taskName"
                placeholder="Task name"
                value={taskInputs.taskName || ''}
                onChange={(e) => handleInputChange(e)}
              />
              <button
                onClick={(e) => handleCreateTask(e, group.id)}
                type="submit"
              >
                Create Task
              </button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToDoGroups;
