import logo from './logo.svg';
import './App.css';
import { Home } from './Home';
import { Departament } from './Departament';
import { Employee } from './Employee';
import { BrowserRouter, Route, Switch, NavLink } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>

      <div className="App container">
        <h3 className="d-flex justify-content-center m-3">Hello DFZ!, Will be a crack</h3>

        <nav className='navbar navbar-expand-lg bg-ligth navbar-dark'>
          <ul className='navbar-nab'>
            <NavLink className="btn btn-light btn-outline-primary" to="/home">
              Home
            </NavLink>
            <NavLink className="btn btn-light btn-outline-primary" to="/departament">
              Departament
            </NavLink>
            <NavLink className="btn btn-light btn-outline-primary" to="/employee">
              Employee
            </NavLink>
          </ul>
        </nav>

        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/departament" component={Departament} />
          <Route path="/employee" component={Employee} />
        </Switch>

      </div>
    </BrowserRouter>
  );
}

export default App;
