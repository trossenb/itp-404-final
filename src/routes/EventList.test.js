import { render, screen, fireEvent } from "@testing-library/react";
import EventList from "./EventList";
import { BrowserRouter } from "react-router-dom";

// Mock data
const mockEvents = [
  { id: 1, title: "Basketball Game", sport: "Basketball", date: "2024-12-12" },
  { id: 2, title: "Soccer Match", sport: "Soccer", date: "2024-11-15" },
  { id: 3, title: "Baseball Game", sport: "Baseball", date: "2024-10-10" },
];

const renderComponent = () =>
  render(
    <BrowserRouter>
      <EventList loaderData={mockEvents} />
    </BrowserRouter>
  );

test("renders all events on initial load", () => {
  renderComponent();
  const events = screen.getAllByTestId("event-card");
  expect(events.length).toBe(3);
});

test("filters events by search input", () => {
  renderComponent();
  const searchInput = screen.getByPlaceholderText("Search events by title");
  fireEvent.change(searchInput, { target: { value: "Soccer" } });
  const events = screen.getAllByTestId("event-card");
  expect(events.length).toBe(1);
  expect(events[0]).toHaveTextContent("Soccer Match");
});

test("sorts events by date ascending", () => {
  renderComponent();
  const sortDateAsc = screen.getByLabelText("Date: Oldest to Recent");
  fireEvent.click(sortDateAsc);
  const events = screen.getAllByTestId("event-card");
  expect(events[0]).toHaveTextContent("Baseball Game");
  expect(events[2]).toHaveTextContent("Basketball Game");
});

test("sorts events by date descending", () => {
  renderComponent();
  const sortDateDesc = screen.getByLabelText("Date: Recent to Oldest");
  fireEvent.click(sortDateDesc);
  const events = screen.getAllByTestId("event-card");
  expect(events[0]).toHaveTextContent("Basketball Game");
  expect(events[2]).toHaveTextContent("Baseball Game");
});

test("sorts events by title ascending", () => {
  renderComponent();
  const sortTitleAsc = screen.getByLabelText("Title: A-Z");
  fireEvent.click(sortTitleAsc);
  const events = screen.getAllByTestId("event-card");
  expect(events[0]).toHaveTextContent("Baseball Game");
  expect(events[2]).toHaveTextContent("Soccer Match");
});

test("sorts events by title descending", () => {
  renderComponent();
  const sortTitleDesc = screen.getByLabelText("Title: Z-A");
  fireEvent.click(sortTitleDesc);
  const events = screen.getAllByTestId("event-card");
  expect(events[0]).toHaveTextContent("Soccer Match");
  expect(events[2]).toHaveTextContent("Baseball Game");
});

test("filters events by sport", () => {
  renderComponent();
  const basketballFilter = screen.getByLabelText("Basketball");
  fireEvent.click(basketballFilter);
  const events = screen.getAllByTestId("event-card");
  expect(events.length).toBe(1);
  expect(events[0]).toHaveTextContent("Basketball Game");
});

test("combines search and sport filters", () => {
  renderComponent();
  const searchInput = screen.getByPlaceholderText("Search events by title");
  fireEvent.change(searchInput, { target: { value: "Game" } });
  const baseballFilter = screen.getByLabelText("Baseball");
  fireEvent.click(baseballFilter);
  const events = screen.getAllByTestId("event-card");
  expect(events.length).toBe(1);
  expect(events[0]).toHaveTextContent("Baseball Game");
});

test("displays no events found when no match exists", () => {
  renderComponent();
  const searchInput = screen.getByPlaceholderText("Search events by title");
  fireEvent.change(searchInput, { target: { value: "Tennis" } });
  expect(screen.getByText("No events found.")).toBeInTheDocument();
});

test("renders correct number of filtered events", () => {
  renderComponent();
  const soccerFilter = screen.getByLabelText("Soccer");
  fireEvent.click(soccerFilter);
  const basketballFilter = screen.getByLabelText("Basketball");
  fireEvent.click(basketballFilter);
  const events = screen.getAllByTestId("event-card");
  expect(events.length).toBe(1);
  expect(events[0]).toHaveTextContent("Baseball Game");
});
