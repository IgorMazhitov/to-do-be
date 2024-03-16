import React, { useState, useEffect } from 'react';

const ContactCreationForm = ({ userName, onContactCreated }) => {
  const [formData, setFormData] = useState({
    name: '',
    userName,
    homePhone: '',
    workPhone: '',
    email: '',
    address: '',
    tags: [],
  });
  const [expanded, setExpanded] = useState(false);

  const [availableTags, setAvailableTags] = useState([]);

  useEffect(() => {
    fetchAvailableTags();
  }, [expanded]);

  const fetchAvailableTags = async () => {
    try {
      const response = await fetch(
        `http://localhost:3033/contacts/tag?userName=${userName}`,
      );
      if (!response.ok) {
        throw new Error('Failed to fetch tags');
      }
      const data = await response.json();

      if (!data.success) {
        alert(`Error: ${data.error}`);
        return;
      }

      setAvailableTags(data.tags);
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const cancel = () => {
    setExpanded(false);
  };

  const handleTagClick = (tag) => {
    if (formData.tags.includes(tag)) {
      setFormData({
        ...formData,
        tags: formData.tags.filter((t) => t !== tag),
      });
    } else {
      setFormData({
        ...formData,
        tags: [...formData.tags, tag],
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `http://localhost:3033/contacts/create`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to create contact');
      }

      const data = await response.json();

      if (!data.success) {
        alert(`Error: ${data.error}`);
        return;
      } else {
        alert('Contact successfully created!');
        setExpanded(false);
        setFormData({
          name: '',
          userName,
          homePhone: '',
          workPhone: '',
          email: '',
          address: '',
          tags: [],
        });
        onContactCreated();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {!expanded && (
        <button
          onClick={toggleExpanded}
          style={{
            padding: '8px 16px',
            backgroundColor: '#2196f3',
            color: '#fff',
            border: 'none',
            borderRadius: '3px',
            cursor: 'pointer',
            marginBottom: '10px',
          }}
        >
          Create Contact
        </button>
      )}
      {expanded && (
        <form
          onSubmit={handleSubmit}
          style={{
            maxWidth: '400px',
            margin: 'auto',
            padding: '20px',
            border: '1px solid #ccc',
            borderRadius: '5px',
          }}
        >
          <label style={{ display: 'block', marginBottom: '5px' }}>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
              style={{ marginLeft: '10px' }}
            />
          </label>
          <label style={{ display: 'block', marginBottom: '5px' }}>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              style={{ marginLeft: '10px' }}
            />
          </label>
          <label style={{ display: 'block', marginBottom: '5px' }}>
            Work Phone:
            <input
              type="text"
              name="workPhone"
              value={formData.workPhone}
              onChange={(e) =>
                setFormData({ ...formData, workPhone: e.target.value })
              }
              style={{ marginLeft: '10px' }}
            />
          </label>
          <label style={{ display: 'block', marginBottom: '5px' }}>
            Home Phone:
            <input
              type="text"
              name="homePhone"
              value={formData.homePhone}
              onChange={(e) =>
                setFormData({ ...formData, homePhone: e.target.value })
              }
              style={{ marginLeft: '10px' }}
            />
          </label>
          <label style={{ display: 'block', marginBottom: '5px' }}>
            Address:
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              style={{ marginLeft: '10px' }}
            />
          </label>
          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>
              Available Tags:
            </label>
            <div>
              {availableTags.map((tag) => (
                <button
                  key={tag.id}
                  style={{
                    padding: '5px 10px',
                    marginRight: '5px',
                    marginBottom: '5px',
                    backgroundColor: formData.tags.includes(tag.id)
                      ? '#ccc'
                      : '#f9f9f9',
                    cursor: 'pointer',
                    border: '1px solid #ccc',
                    borderRadius: '3px',
                  }}
                  onClick={() => handleTagClick(tag.id)}
                >
                  {tag.name}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>
              Selected Tags:
            </label>
            <div>
              {formData.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    marginRight: '5px',
                    backgroundColor: '#f9f9f9',
                    padding: '3px 8px',
                    borderRadius: '3px',
                  }}
                >
                  {availableTags.filter((el) => el.id === tag)[0].name}
                </span>
              ))}
            </div>
          </div>
          <button
            type="submit"
            style={{
              marginTop: '10px',
              padding: '8px 16px',
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
            type="button"
            onClick={cancel}
            style={{
              marginLeft: '10px',
              padding: '8px 16px',
              backgroundColor: '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '3px',
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>
        </form>
      )}
    </div>
  );
};

export default ContactCreationForm;
