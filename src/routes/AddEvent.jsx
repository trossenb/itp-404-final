import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddEvent() {
  const [event, setEvent] = useState({
    id: "1",
    title: "",
    sport: "",
    date: "",
    time: "",
    venue: "",
    ticketPrice: "",
    description: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent((prevEvent) => ({
      prevEvent,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Example validation: Ensure all required fields are filled
    if (!event.title || !event.sport || !event.date || !event.time || !event.venue) {
      toast.error("Please fill in all required fields!");
      return;
    }

    try {
      console.log("New Event:", event);
      toast.success("Event added successfully!");
      navigate("/events"); 
    } catch (error) {
      console.error("Error adding event:", error);
      toast.error("An error occurred while adding the event.");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Add New Event</h2>

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="title" className="form-label">Event Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={event.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="sport" className="form-label">Sport</label>
            <select
              id="sport"
              name="sport"
              className="form-control"
              value={event.sport}
              onChange={handleChange}
              required
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
            <label htmlFor="date" className="form-label">Date</label>
            <input
              type="date"
              className="form-control"
              id="date"
              name="date"
              value={event.date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="time" className="form-label">Time</label>
            <input
              type="time"
              className="form-control"
              id="time"
              name="time"
              value={event.time}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="venue" className="form-label">Venue</label>
            <input
              type="text"
              className="form-control"
              id="venue"
              name="venue"
              value={event.venue}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="ticketPrice" className="form-label">Ticket Price ($)</label>
            <input
              type="number"
              className="form-control"
              id="ticketPrice"
              name="ticketPrice"
              value={event.ticketPrice}
              onChange={handleChange}
              min="0"
              step="0.01"
              required
            />
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">Event Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={event.description}
            onChange={handleChange}
            rows="3"
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary">Add Event</button>
      </form>

      <ToastContainer />
    </div>
  );
}



