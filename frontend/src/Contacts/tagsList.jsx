import React, { useState, useEffect } from 'react';

const TagList = ({ userName, refresh }) => {
  const [tags, setTags] = useState([]);

  const fetchTags = async () => {
    try {
      const response = await fetch(`http://localhost:3033/contacts/tag?userName=${userName}`);
      if (!response.ok) {
        throw new Error('Failed to fetch tags');
      }
      const data = await response.json();

      if (!data.success) {
        alert(`Error: ${data.error}`);
        return;
      }

      setTags(data.tags);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTags();
  }, [refresh]); 

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {tags.map((tag, index) => (
        <span
          key={index}
          style={{
            backgroundColor: '#f9f9f9',
            border: '1px solid #ccc',
            borderRadius: '3px',
            padding: '2px 5px',
            margin: '2px',
            fontSize: '0.8em',
          }}
        >
          {tag.name}
        </span>
      ))}
    </div>
  );
};

export default TagList;
