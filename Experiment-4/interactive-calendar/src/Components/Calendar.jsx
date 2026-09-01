import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useCallback, useMemo } from "react";

function Calendar({
  events,
  onEventDrop,
  onDateClick,
  onEventClick,
  optimized,
}) {

  // Optimized: same events reference when events have not changed
  const processedEvents = useMemo(() => {
    return events.map((event) => ({
      ...event,
      extendedProps: {
        ...event.extendedProps,
        platform: event.platform,
      },
    }));
  }, [events]);


  // Optimized handlers
  const memoizedEventDrop = useCallback(
    (info) => {
      onEventDrop?.(info);
    },
    [onEventDrop]
  );

  const memoizedDateClick = useCallback(
    (info) => {
      onDateClick?.(info);
    },
    [onDateClick]
  );

  const memoizedEventClick = useCallback(
    (info) => {
      onEventClick?.(info);
    },
    [onEventClick]
  );


  // NON-OPTIMIZED handlers
  // New function is created on every Calendar render
  const normalEventDrop = (info) => {
    onEventDrop?.(info);
  };

  const normalDateClick = (info) => {
    onDateClick?.(info);
  };

  const normalEventClick = (info) => {
    onEventClick?.(info);
  };


  // NON-OPTIMIZED creates a new array every render
  const normalEvents = events.map((event) => ({
    ...event,
    extendedProps: {
      ...event.extendedProps,
      platform: event.platform,
    },
  }));


  // Choose implementation
  const calendarEvents = optimized
    ? processedEvents
    : normalEvents;

  const eventDropHandler = optimized
    ? memoizedEventDrop
    : normalEventDrop;

  const dateClickHandler = optimized
    ? memoizedDateClick
    : normalDateClick;

  const eventClickHandler = optimized
    ? memoizedEventClick
    : normalEventClick;


  return (
    <div className="calendar-wrapper">

      <div className="calendar-mode">
        <span>Rendering Mode</span>

        <strong>
          {optimized
            ? "Optimized"
            : "Non-Optimized"}
        </strong>
      </div>

      <FullCalendar
        plugins={[
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin,
        ]}

        initialView="dayGridMonth"

        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right:
            "dayGridMonth,timeGridWeek,timeGridDay",
        }}

        editable={true}
        selectable={true}

        events={calendarEvents}

        eventDrop={eventDropHandler}

        dateClick={dateClickHandler}

        eventClick={eventClickHandler}
      />

    </div>
  );
}

export default Calendar;