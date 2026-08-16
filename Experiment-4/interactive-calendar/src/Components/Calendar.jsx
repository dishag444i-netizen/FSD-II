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
}) {
  const processedEvents = useMemo(() => {
    return events.map((event) => ({
      ...event,
      extendedProps: {
        ...event.extendedProps,
        platform: event.platform,
      },
    }));
  }, [events]);

  const handleEventDrop = useCallback(
    (info) => {
      if (onEventDrop) {
        onEventDrop(info);
      }
    },
    [onEventDrop]
  );

  const handleDateClick = useCallback(
    (info) => {
      if (onDateClick) {
        onDateClick(info);
      }
    },
    [onDateClick]
  );

  const handleEventClick = useCallback(
    (info) => {
      if (onEventClick) {
        onEventClick(info);
      }
    },
    [onEventClick]
  );

  return (
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
        right: "dayGridMonth,timeGridWeek,timeGridDay",
      }}
      editable={true}
      selectable={true}
      events={processedEvents}
      eventDrop={handleEventDrop}
      dateClick={handleDateClick}
      eventClick={handleEventClick}
    />
  );
}

export default Calendar;