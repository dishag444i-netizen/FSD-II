import React from "react";

const EventCard = React.memo(({ event }) => {
  console.log("EventCard rendered:", event.title);

  return (
    <div className="event-card">
      <strong>{event.title}</strong>
      <span>{event.platform}</span>
    </div>
  );
});

export default EventCard;