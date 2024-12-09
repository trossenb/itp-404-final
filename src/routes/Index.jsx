import React from "react";
import { useLoaderData, Link } from "react-router-dom";
import EventCard from "../EventCard";
function Index() {
  const events = useLoaderData();  

  return (
    <div>
      <h2>Digital Ticket</h2>
      <h3>Recent Events</h3>
      <div className="row">
        {events.length === 0 ? (
          <p>No recent events available.</p>
        ) : (
          events.slice(0, 3).map((event) => (
            <div key={event.id} className="col-12 col-md-4 mb-4">
              <EventCard event={event} />  
            </div>
          ))
        )}
      </div>
      <div>
        <Link to="/events" className="btn btn-link">
          View All Events
        </Link>
      </div>
    </div>
  );
}

export default Index;




