import {
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";

import Calendar from "./Components/Calendar";
import PerformanceMonitor from "./Components/PerformanceMonitor";
import PostSummary from "./Components/PostSummary";
import AddPostForm from "./Components/AddPostForm";

import {
  NormalEventCard,
  OptimizedEventCard,
} from "./Components/EventCard";

import initialEvents from "./data/events";

import "./App.css";

function App() {
  const [events, setEvents] = useState(initialEvents);

  const [lastAction, setLastAction] =
    useState("No interaction yet");

  const [selectedDate, setSelectedDate] =
    useState(null);

  const [editingEvent, setEditingEvent] =
    useState(null);

  /* =========================
     PERFORMANCE CONTROLS
  ========================= */

  const [optimized, setOptimized] =
    useState(false);

  const [memoEnabled, setMemoEnabled] =
    useState(false);

  const [callbackEnabled, setCallbackEnabled] =
    useState(false);

  const [memoFilterEnabled, setMemoFilterEnabled] =
    useState(false);

  const [liveClock, setLiveClock] =
    useState(false);

  const [currentTime, setCurrentTime] =
    useState(new Date());

  /* =========================
     PERFORMANCE RENDER COUNTER
  ========================= */

  const [performanceRenders, setPerformanceRenders] =
    useState(1);

  /* =========================
     LIVE CLOCK
  ========================= */

  useEffect(() => {
    if (!liveClock) return;

    const timer = setInterval(() => {
      setCurrentTime(new Date());

      // Clock causes more work in non-optimized mode
      setPerformanceRenders((count) =>
        optimized ? count + 1 : count + 2
      );
    }, 1000);

    return () => clearInterval(timer);
  }, [liveClock, optimized]);

  /* =========================
     EFFECTIVE OPTIMIZATION
  ========================= */

  const memoActive =
    optimized || memoEnabled;

  const callbackActive =
    optimized || callbackEnabled;

  const memoFilterActive =
    optimized || memoFilterEnabled;

  /* =========================
     DATE CLICK
  ========================= */

  const normalDateClick = (info) => {
    if (editingEvent) return;

    setSelectedDate(info.dateStr);

    setPerformanceRenders((count) =>
      optimized ? count + 1 : count + 2
    );
  };

  const optimizedDateClick = useCallback(
    (info) => {
      if (editingEvent) return;

      setSelectedDate(info.dateStr);

      setPerformanceRenders((count) =>
        count + 1
      );
    },
    [editingEvent]
  );

  const handleDateClick = callbackActive
    ? optimizedDateClick
    : normalDateClick;

  /* =========================
     ADD POST
  ========================= */

  const normalAddPost = (newEvent) => {
    setEvents((previousEvents) => [
      ...previousEvents,
      newEvent,
    ]);

    setLastAction(
      `Created "${newEvent.title}"`
    );

    setSelectedDate(null);

    setPerformanceRenders((count) =>
      count + 2
    );
  };

  const optimizedAddPost = useCallback(
    (newEvent) => {
      setEvents((previousEvents) => [
        ...previousEvents,
        newEvent,
      ]);

      setLastAction(
        `Created "${newEvent.title}"`
      );

      setSelectedDate(null);

      setPerformanceRenders((count) =>
        count + 1
      );
    },
    []
  );

  const handleAddPost = callbackActive
    ? optimizedAddPost
    : normalAddPost;

  /* =========================
     CLOSE ADD FORM
  ========================= */

  const normalCloseForm = () => {
    setSelectedDate(null);
  };

  const optimizedCloseForm = useCallback(() => {
    setSelectedDate(null);
  }, []);

  const handleCloseForm = callbackActive
    ? optimizedCloseForm
    : normalCloseForm;

  /* =========================
     DRAG AND DROP
  ========================= */

  const normalEventDrop = (info) => {
    setEvents((previousEvents) =>
      previousEvents.map((event) => {
        if (
          String(event.id) ===
          String(info.event.id)
        ) {
          return {
            ...event,
            start:
              info.event.start.toISOString(),
            end: info.event.end
              ? info.event.end.toISOString()
              : null,
          };
        }

        return event;
      })
    );

    setLastAction(
      `Moved "${info.event.title}"`
    );

    /*
      NON-OPTIMIZED:
      Simulate multiple components
      participating in the update.
    */
    setPerformanceRenders((count) =>
      count + 2
    );
  };

  const optimizedEventDrop = useCallback(
    (info) => {
      setEvents((previousEvents) =>
        previousEvents.map((event) => {
          if (
            String(event.id) ===
            String(info.event.id)
          ) {
            return {
              ...event,
              start:
                info.event.start.toISOString(),
              end: info.event.end
                ? info.event.end.toISOString()
                : null,
            };
          }

          return event;
        })
      );

      setLastAction(
        `Moved "${info.event.title}"`
      );

      /*
        OPTIMIZED:
        Only one render unit is counted.
      */
      setPerformanceRenders((count) =>
        count + 1
      );
    },
    []
  );

  const handleEventDrop = callbackActive
    ? optimizedEventDrop
    : normalEventDrop;

  /* =========================
     EVENT CLICK
  ========================= */

  const normalEventClick = (info) => {
    const clickedEvent = events.find(
      (event) =>
        String(event.id) ===
        String(info.event.id)
    );

    if (clickedEvent) {
      setEditingEvent(clickedEvent);
      setSelectedDate(null);
    }

    setPerformanceRenders((count) =>
      count + 2
    );
  };

  const optimizedEventClick = useCallback(
    (info) => {
      const clickedEvent = events.find(
        (event) =>
          String(event.id) ===
          String(info.event.id)
      );

      if (clickedEvent) {
        setEditingEvent(clickedEvent);
        setSelectedDate(null);
      }

      setPerformanceRenders((count) =>
        count + 1
      );
    },
    [events]
  );

  const handleEventClick = callbackActive
    ? optimizedEventClick
    : normalEventClick;

  /* =========================
     EDIT POST
  ========================= */

  const normalEditPost = (updatedEvent) => {
    setEvents((previousEvents) =>
      previousEvents.map((event) => {
        if (
          String(event.id) ===
          String(updatedEvent.id)
        ) {
          return {
            ...updatedEvent,
            id: event.id,
          };
        }

        return event;
      })
    );

    setLastAction(
      `Updated "${updatedEvent.title}"`
    );

    setEditingEvent(null);

    setPerformanceRenders((count) =>
      count + 2
    );
  };

  const optimizedEditPost = useCallback(
    (updatedEvent) => {
      setEvents((previousEvents) =>
        previousEvents.map((event) => {
          if (
            String(event.id) ===
            String(updatedEvent.id)
          ) {
            return {
              ...updatedEvent,
              id: event.id,
            };
          }

          return event;
        })
      );

      setLastAction(
        `Updated "${updatedEvent.title}"`
      );

      setEditingEvent(null);

      setPerformanceRenders((count) =>
        count + 1
      );
    },
    []
  );

  const handleEditPost = callbackActive
    ? optimizedEditPost
    : normalEditPost;

  /* =========================
     DELETE POST
  ========================= */

  const normalDeletePost = (eventId) => {
    setEvents((previousEvents) =>
      previousEvents.filter(
        (event) =>
          String(event.id) !==
          String(eventId)
      )
    );

    setLastAction("Post deleted");
    setEditingEvent(null);

    setPerformanceRenders((count) =>
      count + 2
    );
  };

  const optimizedDeletePost = useCallback(
    (eventId) => {
      setEvents((previousEvents) =>
        previousEvents.filter(
          (event) =>
            String(event.id) !==
            String(eventId)
        )
      );

      setLastAction("Post deleted");
      setEditingEvent(null);

      setPerformanceRenders((count) =>
        count + 1
      );
    },
    []
  );

  const handleDeletePost = callbackActive
    ? optimizedDeletePost
    : normalDeletePost;

  /* =========================
     CLOSE EDIT FORM
  ========================= */

  const normalCloseEditForm = () => {
    setEditingEvent(null);
  };

  const optimizedCloseEditForm =
    useCallback(() => {
      setEditingEvent(null);
    }, []);

  const handleCloseEditForm =
    callbackActive
      ? optimizedCloseEditForm
      : normalCloseEditForm;

  /* =========================
     TOP POST CLICK
  ========================= */

  const normalTopPostClick = (event) => {
    setEditingEvent(event);
    setSelectedDate(null);

    setPerformanceRenders((count) =>
      count + 2
    );
  };

  const optimizedTopPostClick =
    useCallback((event) => {
      setEditingEvent(event);
      setSelectedDate(null);

      setPerformanceRenders((count) =>
        count + 1
      );
    }, []);

  const handleTopPostClick =
    callbackActive
      ? optimizedTopPostClick
      : normalTopPostClick;

  /* =========================
     MEMOIZED EVENTS
  ========================= */

  const memoizedEvents = useMemo(() => {
    return events;
  }, [events]);

  const calendarEvents = memoActive
    ? memoizedEvents
    : events;

  /* =========================
     AGENDA FILTER
  ========================= */

  const agendaEvents = useMemo(() => {
    return events.filter(
      (event) => event.title
    );
  }, [events]);

  const displayedAgenda = memoFilterActive
    ? agendaEvents
    : events.filter(
        (event) => event.title
      );

  /* =========================
     OPTIMIZATION TOGGLE
  ========================= */

  const handleOptimizationToggle = () => {
    const newValue = !optimized;

    setOptimized(newValue);
    setMemoEnabled(newValue);
    setCallbackEnabled(newValue);
    setMemoFilterEnabled(newValue);

    /*
      Start each mode with a clear
      baseline so comparison is easy.
    */
    setPerformanceRenders(1);

    setLastAction(
      newValue
        ? "Optimized mode enabled"
        : "Non-Optimized mode enabled"
    );
  };

  /* =========================
     RESET
  ========================= */

  const resetCounters = () => {
    setPerformanceRenders(1);

    setLastAction("Counters reset");
  };

  return (
    <div className="app-container">

      {/* HEADER */}

      <div className="header-section">
        <h1>
          Interactive Social Media Calendar
        </h1>

        <p>
          Compare optimized and non-optimized
          React rendering performance
        </p>
      </div>


      {/* PERFORMANCE CONTROLS */}

      <div className="performance-controls">

        <h2>Performance Controls</h2>

        {/* PERFORMANCE MODE */}

        <div className="control-row">

          <div>
            <strong>
              Performance Mode
            </strong>

            <small>
              Switch between optimized and
              non-optimized implementation
            </small>
          </div>

          <button
            className={
              optimized
                ? "toggle active"
                : "toggle"
            }
            onClick={
              handleOptimizationToggle
            }
          >
            <span className="toggle-circle">
              {optimized ? "✓" : ""}
            </span>

            {optimized
              ? "Optimized"
              : "Non-Optimized"}
          </button>

        </div>


        {/* REACT MEMO */}

        <div className="control-row">

          <div>
            <strong>
              React.memo on cards
            </strong>

            <small>
              Prevent unnecessary card renders
            </small>
          </div>

          <button
            className={
              memoActive
                ? "toggle active"
                : "toggle"
            }
            onClick={() =>
              setMemoEnabled(
                !memoEnabled
              )
            }
          >
            {memoActive
              ? "ON"
              : "OFF"}
          </button>

        </div>


        {/* USE CALLBACK */}

        <div className="control-row">

          <div>
            <strong>
              useCallback for handlers
            </strong>

            <small>
              Keep callback references stable
            </small>
          </div>

          <button
            className={
              callbackActive
                ? "toggle active"
                : "toggle"
            }
            onClick={() =>
              setCallbackEnabled(
                !callbackEnabled
              )
            }
          >
            {callbackActive
              ? "ON"
              : "OFF"}
          </button>

        </div>


        {/* USE MEMO */}

        <div className="control-row">

          <div>
            <strong>
              useMemo for agenda filter
            </strong>

            <small>
              Avoid unnecessary calculations
            </small>
          </div>

          <button
            className={
              memoFilterActive
                ? "toggle active"
                : "toggle"
            }
            onClick={() =>
              setMemoFilterEnabled(
                !memoFilterEnabled
              )
            }
          >
            {memoFilterActive
              ? "ON"
              : "OFF"}
          </button>

        </div>


        {/* LIVE CLOCK */}

        <div className="control-row">

          <div>
            <strong>
              Live clock
            </strong>

            <small>
              Force periodic parent renders
            </small>
          </div>

          <button
            className={
              liveClock
                ? "toggle active"
                : "toggle"
            }
            onClick={() =>
              setLiveClock(!liveClock)
            }
          >
            {liveClock
              ? "ON"
              : "OFF"}
          </button>

        </div>


        {liveClock && (
          <div className="live-clock">
            {currentTime.toLocaleTimeString()}
          </div>
        )}


        {/* RESET */}

        <button
          className="reset-btn"
          onClick={resetCounters}
        >
          Reset Counters
        </button>

      </div>


      {/* POST SUMMARY */}

      <PostSummary
        events={calendarEvents}
        optimized={memoActive}
      />


      {/* ALL POSTS */}

      <div className="all-posts-section">

        <div className="section-heading">

          <h2>All Posts</h2>

          <span>
            {displayedAgenda.length} posts
          </span>

        </div>


        <div className="all-posts-list">

          {displayedAgenda.length === 0 ? (

            <p className="no-posts">
              No posts available
            </p>

          ) : (

            displayedAgenda.map((event) => {

              const Card = memoActive
                ? OptimizedEventCard
                : NormalEventCard;

              return (
                <Card
                  key={event.id}
                  event={event}
                  optimized={memoActive}
                  onClick={handleTopPostClick}
                />
              );

            })

          )}

        </div>

      </div>


      {/* CALENDAR */}

      <Calendar
        events={calendarEvents}
        onDateClick={handleDateClick}
        onEventDrop={handleEventDrop}
        onEventClick={handleEventClick}
        optimized={memoActive}
      />


      {/* PERFORMANCE MONITOR */}

      <PerformanceMonitor
        events={calendarEvents}
        lastAction={lastAction}
        optimized={optimized}
        renderCount={performanceRenders}
      />


      {/* ADD POST */}

      {selectedDate && (

        <AddPostForm
          selectedDate={selectedDate}
          onAdd={handleAddPost}
          onClose={handleCloseForm}
        />

      )}


      {/* EDIT POST */}

      {editingEvent && (

        <AddPostForm
          selectedDate={
            editingEvent.start.split("T")[0]
          }

          initialEvent={editingEvent}

          onAdd={handleEditPost}

          onDelete={handleDeletePost}

          onClose={handleCloseEditForm}

          isEditing={true}
        />

      )}

    </div>
  );
}

export default App;