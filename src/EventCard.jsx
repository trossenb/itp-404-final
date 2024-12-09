import React from 'react';
import { Link } from 'react-router-dom';

export default function EventCard({ event }) {
  return (
    <div className="col-12 col-md-4 mb-4">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{event.title}</h5>
          <p className="card-text">{event.date}</p>
          <Link to={`/event/${event.id}`} className="btn btn-info">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}