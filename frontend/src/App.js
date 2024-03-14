import { useEffect, useState } from 'react';
import UserCheckForm from './UserCheck/user-check';
import ToDoGroups from './To-Do-List/toDoGroup';

function App() {
  const [userName, setUserName] = useState('');
  const [entered, setEntered] = useState(false);
  const handleSubmit = (name) => {
    setEntered(true);
    setUserName(name);
  };
  return (
    <div className="App">
      <header className="App-header">
        {userName === '' && !entered && (
          <UserCheckForm onSubmit={handleSubmit} />
        )}
        {entered && (
          <>
            <div>
              <h1>Welcome {userName}</h1>
              <button onClick={() => setEntered(false)}>Change User</button>
            </div>
          </>
        )}
        {userName && !entered && <UserCheckForm onSubmit={handleSubmit} />}
        {userName && entered && <ToDoGroups username={userName} />}
      </header>
    </div>
  );
}

export default App;
