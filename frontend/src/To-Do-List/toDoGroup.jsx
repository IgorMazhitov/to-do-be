import React, { useState, useEffect } from 'react';

const ToDoGroups = ({ username }) => {
  const [groups, setGroups] = useState([]);
  const [newGroupName, setNewGroupName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [newTaskName, setNewTaskName] = useState('');
  const [selectedGroupId, setSelectedGroupId] = useState('');

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
      const sortedGroups = data.groups
        .map((group) => {
          return {
            ...group,
            // need to sort incompleted tasks to the top
            tasks: group.tasks.sort((a, b) => (a.isCompleted ? 1 : -1)),
          };
        })
        .sort((a, b) => a.id - b.id);
      setGroups(sortedGroups);
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
      const sortedGroups = [...groups, data.group]
        .map((group) => {
          return {
            ...group,
            tasks: group.tasks.sort((a, b) => (a.isCompleted ? 1 : -1)),
          };
        })
        .sort((a, b) => a.id - b.id);
      setGroups(sortedGroups);
    } catch (error) {
      alert('Error creating group');
      console.error(error);
    }
  };

  const handleAddTaskClick = (groupId) => {
    setShowModal(true);
    setSelectedGroupId(groupId);
  };

  const handleCreateTask = async (taskName) => {
    if (!selectedGroupId || !taskName) {
      alert('Please select a group and enter a task name');
      return;
    }

    const url = `http://localhost:3033/todo/task`;
    const body = {
      groupId: selectedGroupId.toString(),
      userName: username,
      name: taskName,
    };

    try {
      const response = await fetch(url, {
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

      const data = await response.json();

      if (!data.success) {
        alert(`Error: ${data.error}`);
        return;
      }

      const newGroups = groups
        .map((group) => {
          if (group.id === selectedGroupId) {
            return {
              ...group,
              tasks: [...group.tasks, data.task].sort((a, b) =>
                a.isCompleted ? 1 : -1,
              ),
            };
          }
          return group;
        })
        .sort((a, b) => a.id - b.id);

      setGroups(newGroups);
      setShowModal(false);
      setSelectedGroupId(null);
    } catch (error) {
      alert('Error creating task');
      console.error(error);
    }
  };

  const handleTaskToggle = async (groupId, taskId, completed) => {
    const url = `http://localhost:3033/todo/task/complete?id=${taskId}&groupId=${groupId}&userName=${username}`;

    try {
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

      const newGroups = groups
        .map((group) => {
          if (group.id === groupId) {
            return {
              ...group,
              tasks: group.tasks
                .map((task) => {
                  if (task.id === taskId) {
                    return {
                      ...task,
                      isCompleted: !completed, // Toggle the completed status
                    };
                  }
                  return task;
                })
                .sort((a, b) => (a.isCompleted ? 1 : -1)),
            };
          }
          return group;
        })
        .sort((a, b) => a.id - b.id);

      setGroups(newGroups);
    } catch (error) {
      alert('Error updating task');
      console.error(error);
    }
  };

  useEffect(() => {
    fetchToDoGroups();
  }, [username, groups]);

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <label>Create To-Do Group:</label>
        <input
          type="text"
          value={newGroupName}
          onChange={(e) => setNewGroupName(e.target.value)}
          placeholder="Enter a group name"
          style={{
            marginLeft: '10px',
            padding: '5px',
            borderRadius: '3px',
            border: '1px solid #ccc',
            fontSize: '16px',
          }}
        />
        <button
          onClick={() => handleCreateGroup(newGroupName)}
          style={{
            padding: '5px 10px',
            backgroundColor: 'lightblue',
            border: '1px solid gray',
            borderRadius: '3px',
            fontSize: '16px',
            cursor: 'pointer',
          }}
        >
          Create
        </button>
      </div>

      <h2>To-Do Groups for {username}</h2>
      <ul
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px',
          padding: 0,
          listStyleType: 'none',
        }}
      >
        {groups.map((group) => (
          <li
            key={group.id}
            style={{
              flex: '0 0 auto',
              minWidth: '200px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              borderRadius: '5px',
              overflow: 'hidden',
            }}
          >
            <h3
              style={{
                backgroundColor: '#f2f2f2',
                padding: '10px',
                margin: 0,
                borderBottom: '1px solid #ccc',
                borderRadius: '5px 5px 0 0',
              }}
            >
              {group.name}
            </h3>
            <ul
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '5px',
                padding: '10px',
                margin: 0,
              }}
            >
              {group.tasks.map((task) => (
                <li
                  key={task.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    textDecoration: task.isCompleted ? 'line-through' : 'none',
                    padding: '5px',
                    borderRadius: '3px',
                    backgroundColor: task.isCompleted
                      ? '#f9f9f9'
                      : 'transparent',
                  }}
                >
                  <span>{task.name}</span>
                  {!task.isCompleted && (
                    <label style={{ marginLeft: '5px' }}>
                      <input
                        type="radio"
                        onChange={() =>
                          handleTaskToggle(group.id, task.id, task.isCompleted)
                        }
                      />
                    </label>
                  )}
                </li>
              ))}
              <li>
                <button
                  style={{
                    padding: '5px 10px',
                    backgroundColor: '#2196f3',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '3px',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleAddTaskClick(group.id)}
                >
                  Add Task
                </button>
              </li>
            </ul>
          </li>
        ))}
      </ul>

      {showModal && (
        <div
          style={{
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              background: '#fff',
              padding: '20px',
              borderRadius: '5px',
              maxWidth: '400px',
              width: '100%',
            }}
          >
            <label>Enter Task Name:</label>
            <input
              type="text"
              name="taskName"
              value={newTaskName}
              onChange={(e) => setNewTaskName(e.target.value)}
              style={{
                marginLeft: '10px',
                padding: '5px',
                borderRadius: '3px',
                border: '1px solid #ccc',
                fontSize: '16px',
                width: 'calc(100% - 80px)',
              }}
            />
            <button
              onClick={() => handleCreateTask(newTaskName)}
              style={{
                padding: '5px 10px',
                backgroundColor: 'lightblue',
                border: '1px solid gray',
                borderRadius: '3px',
                fontSize: '16px',
                cursor: 'pointer',
                marginLeft: '10px',
              }}
            >
              Submit
            </button>
            <button
              onClick={() => setShowModal(false)}
              style={{
                padding: '5px 10px',
                backgroundColor: 'lightgray',
                border: '1px solid gray',
                borderRadius: '3px',
                fontSize: '16px',
                cursor: 'pointer',
                marginLeft: '10px',
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ToDoGroups;
