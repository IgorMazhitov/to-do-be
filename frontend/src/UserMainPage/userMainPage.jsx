import React, { useState } from 'react';
import ToDoGroups from '../To-Do-List/toDoGroup';
import { UserSelectedTab } from '../misc/misc.ts';
import ContactCreationForm from '../Contacts/createContact.jsx';
import ContactsList from '../Contacts/contactsList.jsx';
import CreateTag from '../Contacts/createTag.jsx';
import TagList from '../Contacts/tagsList.jsx';

const MainPage = ({ userName }) => {
  const [selectedTab, setSelectedTab] = useState('');
  const [refresh, setRefresh] = useState(false);
  const [refreshTag, setRefreshTag] = useState(false)
  const handleContactCreated = () => {
    setRefresh(!refresh);
  };
  const handleTagCreated = () => {
    setRefreshTag(!refreshTag)
  }
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '20px',
        }}
      >
        <button
          style={{
            padding: '10px 20px',
            margin: '0 10px',
            fontSize: '16px',
            cursor: 'pointer',
            border: 'none',
            backgroundColor: 'transparent',
            color: selectedTab === 'todos' ? '#2196f3' : '#333',
          }}
          onClick={() => setSelectedTab(UserSelectedTab.ToDo)}
        >
          To-Do
        </button>
        <button
          style={{
            padding: '10px 20px',
            margin: '0 10px',
            fontSize: '16px',
            cursor: 'pointer',
            border: 'none',
            backgroundColor: 'transparent',
            color: selectedTab === 'contacts' ? '#2196f3' : '#333',
          }}
          onClick={() => setSelectedTab(UserSelectedTab.Contacts)}
        >
          Contacts
        </button>
      </div>
      <div
        style={{
          width: '80%',
          maxWidth: '800px',
          padding: '20px',
          border: '1px solid #ccc',
          borderRadius: '5px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}
      >
        {selectedTab === UserSelectedTab.ToDo && (
          <ToDoGroups userName={userName} />
        )}
        {selectedTab === UserSelectedTab.Contacts && (
          <>
            <ContactCreationForm userName={userName} onContactCreated={handleContactCreated}/>
            <CreateTag userName={userName} onTagCreated={handleTagCreated} />
            <TagList userName={userName} refresh={refreshTag} />
            <ContactsList userName={userName} refresh={refresh}/>
          </>
        )}
      </div>
    </div>
  );
};

export default MainPage;
