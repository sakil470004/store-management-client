import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import { useState } from 'react';
import PrivateRoute from './components/Login/PrivateRoute';

function App() {
  const [admin, setAdmin] = useState(false);
  const [user, setUser] = useState(false);
  const [userName, setUserName] = useState('')

  return (
    <div className="App">
      <BrowserRouter>
        <Switch >
          <Route exact path="/">
            <Login
              setAdmin={setAdmin}
              setUser={setUser}
              setUserName={setUserName}
            />
          </Route>
          <PrivateRoute
            user={user}
            path="/dashboard">
            <Home
              admin={admin}
              userName={userName}
              setUser={setUser}
              setUserName={setUserName}
              setAdmin={setAdmin}
            />
          </PrivateRoute>

        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
