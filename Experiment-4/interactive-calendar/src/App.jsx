import { useState } from "react";
import Calendar from "./Components/Calendar";
import PerformanceMonitor from "./Components/PerformanceMonitor";
import PostSummary from "./Components/PostSummary";
import AddPostForm from "./Components/AddPostForm";
import initialEvents from "./data/events";
import "./App.css";

function App() {
  const [events, setEvents] = useState(initialEvents);
  const [lastAction, setLastAction] = useState("No interaction yet");
  const [selectedDate, setSelectedDate] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);

  const handleDateClick = (info) => {
    if (editingEvent) return;

    setSelectedDate(info.dateStr);
  };

  // Add new post
  const handleAddPost = (newEvent) => {
    setEvents((previousEvents) => [
      ...previousEvents,
      newEvent,
    ]);

    setLastAction(`Created "${newEvent.title}"`);
    setSelectedDate(null);
  };

  const handleCloseForm = () => {
    setSelectedDate(null);
  };

  // Drag and drop
  const handleEventDrop = (info) => {
    setEvents((previousEvents) =>
      previousEvents.map((event) => {
        if (String(event.id) === String(info.event.id)) {
          return {
            ...event,
            start: info.event.start.toISOString(),
            end: info.event.end
              ? info.event.end.toISOString()
              : null,
          };
        }

        return event;
      })
    );

    setLastAction(`Moved "${info.event.title}"`);
  };

  // Click calendar post
  const handleEventClick = (info) => {
    const clickedEvent = events.find(
      (event) => String(event.id) === String(info.event.id)
    );

    if (clickedEvent) {
      setEditingEvent(clickedEvent);
      setSelectedDate(null);
    }
  };

  // Edit post
  const handleEditPost = (updatedEvent) => {
    setEvents((previousEvents) =>
      previousEvents.map((event) => {
        if (String(event.id) === String(updatedEvent.id)) {
          return {
            ...updatedEvent,
            id: event.id,
          };
        }

        return event;
      })
    );

    setLastAction(`Updated "${updatedEvent.title}"`);
    setEditingEvent(null);
  };

  // Delete post
  const handleDeletePost = (eventId) => {
    setEvents((previousEvents) =>
      previousEvents.filter(
        (event) => String(event.id) !== String(eventId)
      )
    );

    setLastAction("Post deleted");
    setEditingEvent(null);
  };

  const handleCloseEditForm = () => {
    setEditingEvent(null);
  };

  // Click post from top list
  const handleTopPostClick = (event) => {
    setEditingEvent(event);
    setSelectedDate(null);
  };

  return (
    <div className="app-container">
      <h1>Interactive Social Media Calendar</h1>

      <PostSummary events={events} />

      {/* ALL POSTS ABOVE CALENDAR */}
      <div className="all-posts-section">
        <h2>All Posts</h2>

        <div className="all-posts-list">
          {events.length === 0 ? (
            <p className="no-posts">No posts available</p>
          ) : (
            events.map((event) => (
              <div
                className="top-post-card"
                key={event.id}
                onClick={() => handleTopPostClick(event)}
              >
                <strong>{event.title}</strong>

                <span>{event.platform}</span>

                <small>
                  {new Date(event.start).toLocaleString()}
                </small>
              </div>
            ))
          )}
        </div>
      </div>

      {/* CALENDAR */}
      <Calendar
        events={events}
        onDateClick={handleDateClick}
        onEventDrop={handleEventDrop}
        onEventClick={handleEventClick}
      />

      <PerformanceMonitor
        events={events}
        lastAction={lastAction}
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
          selectedDate={editingEvent.start.split("T")[0]}
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