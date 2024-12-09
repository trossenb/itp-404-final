import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div>
        <Link className="navbar-brand" to="/">Digital Tickets</Link>
        <div>
          <ul className="navbar-nav">
            <li>
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li>
              <Link className="nav-link" to="/add-event">Add Event</Link>
            </li>
            <li>
              <Link className="nav-link" to="/events">Event List</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
