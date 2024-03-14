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
      <div>
        <button onClick={() => handleTabClick(UserCheckTabs.Create)}>
          Create
        </button>
        <button onClick={() => handleTabClick(UserCheckTabs.Enter)}>
          Enter
        </button>
      </div>
      {tab === UserCheckTabs.Create && <CreateForm onSubmit={handleSubmit} />}
      {tab === UserCheckTabs.Enter && <EnterUser onSubmit={handleSubmit} />}
    </div>
  );
};

export default UserCheckForm;
