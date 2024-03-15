import React, { useState } from 'react';
import { UserCheckTabs } from '../misc/misc.ts';
import CreateForm from './create-user';
import EnterUser from './enter-user';

const UserCheckForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [tab, setTab] = useState(UserCheckTabs.Create);

  const handleSubmit = (name) => {
    setName(name);
    onSubmit(name);
  };

  const handleTabClick = (tab) => {
    console.log(tab)
    setTab(tab);
  };

  return (
    <div>
      <div style={{ marginBottom: '10px' }}>
        <button
          onClick={() => handleTabClick(UserCheckTabs.Create)}
          style={{
            marginRight: '10px',
            backgroundColor: tab === UserCheckTabs.Create ? 'lightblue' : 'white',
            border: '1px solid gray',
            padding: '5px 10px',
            cursor: 'pointer',
          }}
        >
          Create
        </button>
        <button
          onClick={() => handleTabClick(UserCheckTabs.Enter)}
          style={{
            backgroundColor: tab === UserCheckTabs.Enter ? 'lightblue' : 'white',
            border: '1px solid gray',
            padding: '5px 10px',
            cursor: 'pointer',
          }}
        >
          Enter
        </button>
      </div>
      {tab === UserCheckTabs.Create && <CreateForm onSubmit={handleSubmit} />}
      {tab === UserCheckTabs.Enter && <EnterUser onSubmit={handleSubmit} />}
    </div>
  );
};

export default UserCheckForm;
