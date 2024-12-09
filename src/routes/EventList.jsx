import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import sortBy from "lodash.sortby";
import EventCard from "../EventCard";

export default function EventList() {
  const events = useLoaderData();
  const [sortedEvents, setSortedEvents] = useState(events);
  const [search, setSearch] = useState("");
  const [sortByOption, setSortByOption] = useState("date-asc");
  const [selectedSports, setSelectedSports] = useState(() => {
    const sports = [...new Set(events.map((event) => event.sport))];
    return Object.fromEntries(sports.map((sport) => [sport, true]));
  });

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearch(value);

    const filteredEvents = events
      .filter((event) =>
        event.title.toLowerCase().includes(value.toLowerCase())
      )
      .filter((event) => selectedSports[event.sport]);
    sortEvents(filteredEvents);
  };

  const handleSortChange = (event) => {
    const selectedSort = event.target.value;
    setSortByOption(selectedSort);
    sortEvents(sortedEvents, selectedSort);
  };

  const handleSportFilterChange = (sport) => {
    const updatedSports = { ...selectedSports, [sport]: !selectedSports[sport] };
    setSelectedSports(updatedSports);

    const filteredEvents = events
      .filter((event) => updatedSports[event.sport])
      .filter((event) => event.title.toLowerCase().includes(search.toLowerCase()));
    sortEvents(filteredEvents);
  };

  const sortEvents = (eventsList, sortOption = sortByOption) => {
    let sortedArray = [...eventsList];

    switch (sortOption) {
      case "date-asc":
        sortedArray = sortBy(sortedArray, ["date"]);
        break;
      case "date-desc":
        sortedArray = sortBy(sortedArray, ["date"]).reverse();
        break;
      case "title-asc":
        sortedArray = sortBy(sortedArray, ["title"]);
        break;
      case "title-desc":
        sortedArray = sortBy(sortedArray, ["title"]).reverse();
        break;
      default:
        break;
    }

    setSortedEvents(sortedArray);
  };

  return (
    <div>
      <h2>Event List</h2>

      <div className="d-flex flex-column mb-3">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search events by title"
          value={search}
          onChange={handleSearch}
          className="form-control mb-3"
          style={{ maxWidth: "300px" }}
        />

        {/* Sort Options */}
        <div className="mb-3">
          <label className="me-2">Sort By:</label>
          <div className="d-inline-flex flex-wrap gap-3">
            <label>
              <input
                type="radio"
                value="date-asc"
                checked={sortByOption === "date-asc"}
                onChange={handleSortChange}
                className="me-1"
              />
              Date: Oldest to Recent
            </label>
            <label>
              <input
                type="radio"
                value="date-desc"
                checked={sortByOption === "date-desc"}
                onChange={handleSortChange}
                className="me-1"
              />
              Date: Recent to Oldest
            </label>
            <label>
              <input
                type="radio"
                value="title-asc"
                checked={sortByOption === "title-asc"}
                onChange={handleSortChange}
                className="me-1"
              />
              Title: A-Z
            </label>
            <label>
              <input
                type="radio"
                value="title-desc"
                checked={sortByOption === "title-desc"}
                onChange={handleSortChange}
                className="me-1"
              />
              Title: Z-A
            </label>
          </div>
        </div>

        <div>
          <label className="d-block mb-2">Filter by Sport:</label>
          <div className="d-flex flex-wrap gap-3">
            {Object.keys(selectedSports).map((sport) => (
              <label key={sport}>
                <input
                  type="checkbox"
                  checked={selectedSports[sport]}
                  onChange={() => handleSportFilterChange(sport)}
                  className="me-1"
                />
                {sport}
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="row">
        {sortedEvents.length === 0 ? (
          <p>No events found.</p>
        ) : (
          sortedEvents.map((event) => (
            <div key={event.id} className="col-12 col-md-4 mb-4">
              <EventCard event={event} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

