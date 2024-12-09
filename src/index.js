import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/Root";
import Index from "./routes/Index";
import EventList from "./routes/EventList";
import AddEvent from "./routes/AddEvent";
import EventDetails from "./routes/EventDetails";


const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Index />,
        loader: () => {
          return fetch('/db.json')
            .then((response) => response.json())
            .then((json) => json.events);
        },
      },
      {
        path: "/events",
        element: <EventList />,
        loader: () => {
          return fetch('/db.json')
            .then((response) => response.json())
            .then((json) => json.events);
        },
      },
      {
        path: "/event/:eventId", 
        element: <EventDetails />,
        loader: ({ params }) => {
          const { eventId } = params; 
      
          return fetch('/db.json')
            .then((response) => response.json())
            .then((json) => {
              const event = json.events.find(event => event.id === eventId);
              if (!event) {
                throw new Error("Event not found");
              }
              return event; 
            });
        },
      },
      { path: "/add-event", element: <AddEvent /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
