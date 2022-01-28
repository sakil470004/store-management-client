import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import { useState } from 'react';

function App() {
  const [admin, setAdmin] = useState(false);
  const [user, setUser] = useState(false);

  return (
    <div className="App">
      <BrowserRouter>
        <Switch >
          <Route exact path="/">
           <Login 
             setAdmin={setAdmin}
             setUser={setUser}
           />
          </Route>
          <Route path="/dashboard">
            <Home 
            admin={admin}
            user={user}
             />
          </Route>

        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
