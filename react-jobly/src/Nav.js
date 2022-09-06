import { NavLink } from "react-router-dom";
import {
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import Companies from './Companies';
import Jobs from './Jobs';
import Homepage from './Homepage';

function Nav(){
  return(
    <nav>
      <NavLink to="/" end>Jobly</NavLink>
      <NavLink to="/companies" end>Companies</NavLink>
      <NavLink to="/jobs" end>Jobs</NavLink>
    </nav>
  )
}

export default Nav;