import { useEffect, useState } from 'react';
import UserCheckForm from './UserCheck/user-check';
import ToDoGroups from './To-Do-List/toDoGroup';
import MainPage from './UserMainPage/userMainPage';

function App() {
  const [userName, setUserName] = useState('');
  const [entered, setEntered] = useState(false);
  const handleSubmit = (name) => {
    setEntered(true);
    setUserName(name);
  };
  const handleChangeUser = () => {
    setEntered(false);
    setUserName('');
  };
  return (
    <div className="App">
      <header className="App-header">
        {userName === '' && !entered && (
          <UserCheckForm onSubmit={handleSubmit} />
        )}
        {entered && (
          <>
            <div style={{ borderBottom: '1px solid #ccc', padding: '10px' }}>
              <h1 style={{ margin: 0 }}>Welcome {userName}</h1>
              <button onClick={() => handleChangeUser()}>Change User</button>
            </div>
          </>
        )}
        {userName && !entered && <UserCheckForm onSubmit={handleSubmit} />}
        {userName && entered && <MainPage userName={userName} />}
      </header>
    </div>
  );
}

export default App;
