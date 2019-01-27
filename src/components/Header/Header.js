import React from 'react';

import { Link } from 'react-router-dom';

const Header = () => (
  <header>
    <Link to="/">Dashboard</Link>

    <nav>
      <Link to="/scoreboard">Scoreboard</Link>
    </nav>

    <hr />
  </header>
);

export default Header;
