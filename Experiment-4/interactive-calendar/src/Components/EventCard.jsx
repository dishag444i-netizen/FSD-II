import { memo } from "react";
import useRenderCount from "../hooks/useRenderCount";

/* =========================
   NORMAL EVENT CARD
   ========================= */

export function NormalEventCard({ event, onClick }) {
  const renderCount = useRenderCount();

  return (
    <div
      className="event-card"
      onClick={() => onClick(event)}
    >
      <div className="event-card-top">
        <div>
          <strong>{event.title}</strong>

          <div className="event-platform">
            {event.platform}
          </div>
        </div>

        <span className="render-badge">
          {renderCount}
        </span>
      </div>

      <div className="event-card-info">
        <span>
          {new Date(event.start).toLocaleString()}
        </span>
      </div>

      <div className="event-render-label">
        Renders: {renderCount}
      </div>
    </div>
  );
}


/* =========================
   OPTIMIZED EVENT CARD
   ========================= */

function OptimizedEventCardComponent({
  event,
  onClick,
}) {
  const renderCount = useRenderCount();

  return (
    <div
      className="event-card optimized-card"
      onClick={() => onClick(event)}
    >
      <div className="event-card-top">
        <div>
          <strong>{event.title}</strong>

          <div className="event-platform">
            {event.platform}
          </div>
        </div>

        <span className="render-badge optimized-badge">
          {renderCount}
        </span>
      </div>

      <div className="event-card-info">
        <span>
          {new Date(event.start).toLocaleString()}
        </span>
      </div>

      <div className="event-render-label">
        Renders: {renderCount}
      </div>
    </div>
  );
}


/*
  React.memo prevents this card from rendering again
  when its props have not changed.
*/

export const OptimizedEventCard = memo(
  OptimizedEventCardComponent
);


/* =========================
   DEFAULT EXPORT
   ========================= */

export default EventCard;


/* Normal card component for default export */

function EventCard({ event, onClick }) {
  return (
    <NormalEventCard
      event={event}
      onClick={onClick}
    />
  );
}