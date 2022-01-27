import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home/Home';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch >
          <Route exact path="/">
            <h1>log in</h1>
          </Route>
          <Route path="/sa">
            <Home />
          </Route>

        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
