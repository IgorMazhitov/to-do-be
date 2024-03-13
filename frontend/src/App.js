import { useEffect, useState } from "react";
import NameForm from "./UserCheck/user-check";
import ToDoGroups from "./To-Do-List/toDoGroup";

function App() {
  const [userName, setUserName] = useState('');
  const handleSubmit = (name) => {
    setUserName(name);
  };
  return (
    <div className="App">
      <header className="App-header">
        check
        {userName === '' && <NameForm onSubmit={handleSubmit}/>}
        {userName && <ToDoGroups username={userName}/>}
      </header>
    </div>
  );
}

export default App;
