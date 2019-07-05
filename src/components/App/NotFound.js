import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <>
    <h2>Sorry, page not found</h2>

    <Link to="/">Go home</Link>
  </>
);

export default NotFound;
