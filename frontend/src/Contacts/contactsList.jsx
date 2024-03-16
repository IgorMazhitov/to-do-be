import React, { useState, useEffect } from 'react';

const ContactsList = ({ userName, refresh }) => {
  const [contacts, setContacts] = useState([]);
  const [tags, setTags] = useState([]);
  const [filter, setFilter] = useState('');

  const fetchTags = async () => {
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
      console.log('contact list tags', data.tags);
      setTags(data.tags);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchContacts = async () => {
    try {
      const response = await fetch(
        `http://localhost:3033/contacts?userName=${userName}`,
      );
      if (!response.ok) {
        throw new Error('Failed to fetch contacts');
      }
      const data = await response.json();

      if (!data.success) {
        alert(`Error: ${data.error}`);
        return;
      } else {
        setContacts(data.contacts);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const removeContact = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3033/contacts/remove?userName=${userName}&contactId=${id}`,
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
        alert('User successfully deleted!');
        fetchContacts();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const filteredContacts = contacts.filter((contact) => {
    return (
      contact.name.toLowerCase().includes(filter.toLowerCase()) ||
      contact.email.toLowerCase().includes(filter.toLowerCase()) ||
      contact.tags
        .map((tagId) => tags.find((tag) => tag.id === parseInt(tagId))?.name)
        .join(', ')
        .toLowerCase()
        .includes(filter.toLowerCase())
    );
  });

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  useEffect(() => {
    fetchContacts();
    fetchTags();
  }, [refresh]);

  return (
    <div
      style={{ marginTop: '100px', display: 'flex', flexDirection: 'column' }}
    >
      <h2>Contact List</h2>
      <input
        type="text"
        placeholder="Search by name, email, or tag"
        value={filter}
        onChange={(e) => handleFilterChange(e)}
        style={{ marginBottom: '10px', padding: '5px' }}
      />
      {filteredContacts.map((contact) => (
        <div
          key={contact.id}
          style={{
            flex: '1 1 300px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            padding: '10px',
            margin: '5px',
            backgroundColor: '#f9f9f9',
            position: 'relative', // Add position relative for the button
          }}
        >
          <h3>{contact.name}</h3>
          <p>
            <strong>Email:</strong> {contact.email}
          </p>
          <p>
            <strong>Work Phone:</strong> {contact.workPhone}
          </p>
          <p>
            <strong>Home Phone:</strong> {contact.homePhone}
          </p>
          <p>
            <strong>Address:</strong> {contact.address}
          </p>
          <p>
            <strong>Tags:</strong>{' '}
            {contact.tags
              .map((tagId) => {
                const tagName = tags.find(
                  (tag) => tag.id === parseInt(tagId),
                )?.name;
                return tagName;
              })
              .join(', ')}
          </p>
          <button
            style={{ position: 'absolute', top: '5px', right: '5px' }}
            onClick={() => removeContact(contact.id)}
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};

export default ContactsList;
