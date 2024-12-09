import React, { useState } from "react";
import { useLoaderData, useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function EventDetail() {
  const event = useLoaderData(); 
  const [isEditing, setIsEditing] = useState(false);
  const [newComment, setNewComment] = useState(""); 
  const [editedEvent, setEditedEvent] = useState({
    title: event.title,
    sport: event.sport,
    date: event.date,
    time: event.time,
    venue: event.venue,
    ticketPrice: event.ticketPrice,
    description: event.description,
  });

  const handleEditSubmit = (e) => {
    e.preventDefault();

    const updatedEvent = {};

    for (const key in editedEvent) {
      if (editedEvent[key] !== event[key]) {
        updatedEvent[key] = editedEvent[key];
      }
    }

    fetch(`http://localhost:3000/events/${event.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedEvent),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update the event");
        }
        return response.json();
      })
      .then(() => {
        toast.success("Event updated successfully!");
        setIsEditing(false); 
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("There was an error updating the event.");
      });
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();

    if (!newComment.trim()) {
      toast.warning("Comment cannot be empty.");
      return;
    }

    const commentData = {
      body: newComment,
      timestamp: new Date().toISOString(),
    };

    fetch(`http://localhost:3000/events/${event.id}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commentData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add comment");
        }
        return response.json();
      })
      .then((comment) => {
        toast.success("Comment added successfully!");
        event.comments = [(event.comments || []), comment]; 
        setNewComment(""); 
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("There was an error adding the comment.");
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedEvent((prev) => ({ prev, [name]: value }));
  };

  const toggleEdit = () => setIsEditing(!isEditing);

  return (
    <div className="container mt-4">
      <h1>{event.title}</h1>
      <p><strong>Sport:</strong> {event.sport}</p>
      <p><strong>Date:</strong> {event.date}</p>
      <p><strong>Time:</strong> {event.time}</p>
      <p><strong>Venue:</strong> {event.venue}</p>
      <p><strong>Ticket Price:</strong> ${event.ticketPrice}</p>
      <p><strong>Description:</strong> {event.description || "No description available."}</p>

      <h3>Comments</h3>
      <ul>
        {event.comments?.length ? (
          event.comments.map((comment, index) => (
            <li key={index}>
              <p>
                <strong>{comment.author || "Anonymous"}</strong>:{" "}
                {comment.body || "No Comment"}
                <br />
                <small>{new Date(comment.timestamp).toLocaleString()}</small>
              </p>
            </li>
          ))
        ) : (
          <p>No comments available.</p>
        )}
      </ul>

      <div className="mt-4">
        <h4>Add a Comment</h4>
        <form onSubmit={handleCommentSubmit}>
        <textarea
            className="form-control mb-2"
            rows="1"
            placeholder="Name"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          >Name</textarea>
          <textarea
            className="form-control mb-2"
            rows="3"
            placeholder="Write your comment here..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          >Comment</textarea>
          <button type="submit" className="btn btn-primary">
            Add Comment
          </button>
        </form>
      </div>

      <div>
        <button onClick={toggleEdit} className="btn btn-primary mb-3 mt-4">
          {isEditing ? "Cancel Edit" : "Edit Event"}
        </button>

        {isEditing && (
          <form onSubmit={handleEditSubmit} className="mb-4">
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Event Title</label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  value={editedEvent.title}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Sport</label>
                <select
                  className="form-control"
                  name="sport"
                  value={editedEvent.sport}
                  onChange={handleChange}
                >
                  <option value="">Select Sport</option>
                  <option value="Basketball">Basketball</option>
                  <option value="Football">Football</option>
                  <option value="Soccer">Soccer</option>
                  <option value="Baseball">Baseball</option>
                  <option value="Hockey">Hockey</option>
                </select>
              </div>
            </div>

            <div className="row">
              <div className="col-md-4 mb-3">
                <label className="form-label">Date</label>
                <input
                  type="date"
                  className="form-control"
                  name="date"
                  value={editedEvent.date}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Time</label>
                <input
                  type="time"
                  className="form-control"
                  name="time"
                  value={editedEvent.time}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Venue</label>
                <input
                  type="text"
                  className="form-control"
                  name="venue"
                  value={editedEvent.venue}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Ticket Price ($)</label>
                <input
                  type="number"
                  className="form-control"
                  name="ticketPrice"
                  value={editedEvent.ticketPrice}
                  onChange={handleChange}
                  min="0"
                  step="1.00"
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Event Description</label>
              <textarea
                className="form-control"
                name="description"
                value={editedEvent.description}
                onChange={handleChange}
                rows="3"
              ></textarea>
            </div>

            <button type="submit" className="btn btn-success">
              Save Changes
            </button>
          </form>
        )}
      </div>

      <p>
        <button className="btn btn-danger">Delete</button>
      </p>
      <Link to="/events" className="btn btn-secondary mt-3">
        Back to Events
      </Link>
    </div>
  );
}
