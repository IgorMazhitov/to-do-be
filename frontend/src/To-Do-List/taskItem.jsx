import React from 'react';

const TaskItem = ({ task, onTaskToggle }) => {
  return (
    <li
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        textDecoration: task.isCompleted ? 'line-through' : 'none',
        padding: '5px',
        borderRadius: '3px',
        backgroundColor: task.isCompleted ? '#f9f9f9' : 'transparent',
      }}
    >
      <span>{task.name}</span>
      {!task.isCompleted && (
        <label style={{ marginLeft: '5px' }}>
          <input
            type="radio"
            onChange={onTaskToggle}
          />
        </label>
      )}
    </li>
  );
};

export default TaskItem;
