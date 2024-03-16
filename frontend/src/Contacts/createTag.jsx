import React, { useState } from 'react';

const CreateTag = ({ userName, onTagCreated }) => {
  const [creatingTag, setCreatingTag] = useState(false);
  const [tagName, setTagName] = useState('');

  const startCreatingTag = () => {
    setCreatingTag(true);
  };

  const cancelCreatingTag = () => {
    setCreatingTag(false);
    setTagName('');
  };

  const handleTagNameChange = (e) => {
    setTagName(e.target.value);
  };

  const handleTagSubmit = async () => {
    if (tagName.trim() !== '') {
      const response = await fetch(
        `http://localhost:3033/contacts/tag?userName=${userName}&tagName=${tagName}`,
        {
          method: 'POST',
        },
      );
      if (!response.ok) {
        throw new Error('Failed to delete contact');
      }

      const data = await response.json();

      if (!data.success) {
        alert(`Error: ${data.error}`);
        return;
      } else {
        alert('Tag successfully created!');
        onTagCreated();
      }
      setTagName('');
      setCreatingTag(false);
    }
  };

  return (
    <div>
      {!creatingTag && (
        <button
          onClick={startCreatingTag}
          style={{
            padding: '5px 10px',
            backgroundColor: '#2196f3',
            color: '#fff',
            border: 'none',
            borderRadius: '3px',
            cursor: 'pointer',
            marginBottom: '10px',
          }}
        >
          Create Tag
        </button>
      )}
      {creatingTag && (
        <div style={{ marginTop: '10px' }}>
          <input
            type="text"
            placeholder="Enter tag name"
            value={tagName}
            onChange={(e) => handleTagNameChange(e)}
            style={{
              padding: '5px',
              marginRight: '5px',
              borderRadius: '3px',
              border: '1px solid #ccc',
            }}
          />
          <button
            onClick={() => handleTagSubmit()}
            style={{
              padding: '5px 10px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '3px',
              cursor: 'pointer',
            }}
          >
            Submit
          </button>
          <button
            onClick={() => cancelCreatingTag()}
            style={{
              padding: '5px 10px',
              backgroundColor: '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '3px',
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default CreateTag;
