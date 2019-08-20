import React from 'react';
import { Link } from 'react-router-dom';

import './header.css';

const Header = ({onSeviceChange}) => {
  return (
    <div className="header d-flex">
      <h3>
        <Link to="/people/1">Star DB</Link>
      </h3>
      <ul className="d-flex">
        <li>
          <Link to="/people/1">People</Link>
        </li>
        <li>
          <Link to="/planets/1">Planets</Link>
        </li>
        <li>
          <Link to="/starships/10">Starships</Link>
        </li>
        {/* <li>
          <Link to="/star-db/login">Login</Link>
        </li>
        <li>
          <Link to="/star-db/secret">Secret</Link>
        </li> */}
      </ul>
      {/* <button className="btn btn-primary btn-sm"
              onClick={onSeviceChange}>
        Change Service
      </button> */}
    </div>
  );
}

export default Header; 