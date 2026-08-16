import { useEffect, useState } from "react";

function AddPostForm({
  selectedDate,
  onAdd,
  onDelete,
  onClose,
  initialEvent,
  isEditing = false,
}) {
  const [title, setTitle] = useState("");
  const [platform, setPlatform] = useState("Instagram");
  const [time, setTime] = useState("10:00");

  // Fill form when editing
  useEffect(() => {
    if (isEditing && initialEvent) {
      setTitle(initialEvent.title || "");
      setPlatform(initialEvent.platform || "Instagram");

      if (initialEvent.start) {
        const date = new Date(initialEvent.start);

        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");

        setTime(`${hours}:${minutes}`);
      }
    } else {
      setTitle("");
      setPlatform("Instagram");
      setTime("10:00");
    }
  }, [initialEvent, isEditing]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      return;
    }

    // Editing existing post
    if (isEditing && initialEvent) {
      const updatedEvent = {
        ...initialEvent,
        title: title.trim(),
        start: `${selectedDate}T${time}:00`,
        end: `${selectedDate}T${time}:30`,
        platform,
      };

      onAdd(updatedEvent);
      return;
    }

    // Creating new post
    const newEvent = {
      id: Date.now().toString(),
      title: title.trim(),
      start: `${selectedDate}T${time}:00`,
      end: `${selectedDate}T${time}:30`,
      platform,
    };

    onAdd(newEvent);

    setTitle("");
    setTime("10:00");
    setPlatform("Instagram");
  };

  const handleDelete = () => {
    if (!initialEvent || !onDelete) {
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete "${initialEvent.title}"?`
    );

    if (confirmed) {
      onDelete(initialEvent.id);
    }
  };

  return (
    <div className="post-form-overlay">
      <div className="post-form">
        <h2>{isEditing ? "Edit Post" : "Create New Post"}</h2>

        <p className="selected-date">
          Date: <strong>{selectedDate}</strong>
        </p>

        <form onSubmit={handleSubmit}>
          <label>Post Title</label>

          <input
            type="text"
            placeholder="Enter post title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />

          <label>Platform</label>

          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
          >
            <option value="Instagram">Instagram</option>
            <option value="YouTube">YouTube</option>
            <option value="Facebook">Facebook</option>
            <option value="LinkedIn">LinkedIn</option>
          </select>

          <label>Time</label>

          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />

          <div className="form-buttons">
            <button type="button" onClick={onClose}>
              Cancel
            </button>

            {isEditing && (
              <button
                type="button"
                onClick={handleDelete}
              >
                Delete Post
              </button>
            )}

            <button type="submit">
              {isEditing ? "Save Changes" : "Add Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddPostForm;