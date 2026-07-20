import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const platforms = {
    Twitter: 280,
    Facebook: 63206,
    Instagram: 2200,
    LinkedIn: 3000,
  };

  const [post, setPost] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [media, setMedia] = useState(null);
  const [drafts, setDrafts] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    const savedDrafts =
      JSON.parse(localStorage.getItem("drafts")) || [];
    setDrafts(savedDrafts);
  }, []);

  const saveDraft = () => {
    if (post.trim() === "") {
      alert("Please write a post first!");
      return;
    }

    if (selectedPlatform === "") {
      alert("Please select a platform!");
      return;
    }

    const draft = {
      post,
      platform: selectedPlatform,
      media: media ? media.name : "No File",
    };

    let updatedDrafts;

    if (editingIndex !== null) {
      updatedDrafts = [...drafts];
      updatedDrafts[editingIndex] = draft;
      setEditingIndex(null);
    } else {
      updatedDrafts = [...drafts, draft];
    }

    setDrafts(updatedDrafts);

    localStorage.setItem(
      "drafts",
      JSON.stringify(updatedDrafts)
    );

    setPost("");
    setSelectedPlatform("");
    setMedia(null);
  };

  const editDraft = (index) => {
    const draft = drafts[index];

    setPost(draft.post);
    setSelectedPlatform(draft.platform);
    setEditingIndex(index);
  };

  const deleteDraft = (index) => {
    const updatedDrafts = drafts.filter((_, i) => i !== index);

    setDrafts(updatedDrafts);

    localStorage.setItem(
      "drafts",
      JSON.stringify(updatedDrafts)
    );
  };

  return (
    <div className="container">
      <h3>Welcome! Create your social media post below.</h3>

      <h1>Multi-Platform Post Composer</h1>

      <div className="editor-section">

        <div className="left-side">

          <textarea
            placeholder="Write your post here..."
            value={post}
            onChange={(e) => setPost(e.target.value)}
          />

          <p className="last-edit">
            Last Edited: {new Date().toLocaleTimeString()}
          </p>

        </div>

       <div className="right-side">

  <h2>Validation</h2>

  {selectedPlatform !== "" && (
    <div className="validation">

      <h3>{selectedPlatform}</h3>

      <p>
        Characters: {post.length} / {platforms[selectedPlatform]}
      </p>

      {post.length <= platforms[selectedPlatform] ? (
        <p className="success">
          Remaining Characters:{" "}
          {platforms[selectedPlatform] - post.length}
        </p>
      ) : (
        <p className="error">
          Character Limit Exceeded by{" "}
          {post.length - platforms[selectedPlatform]}
        </p>
      )}

    </div>
  )}

</div>

      </div>

      <h2>Select Platform</h2>

      <div className="platforms">

        {Object.keys(platforms).map((platform) => (

          <label key={platform}>

            <input
              type="radio"
              name="platform"
              checked={selectedPlatform === platform}
              onChange={() => setSelectedPlatform(platform)}
            />

            {platform}

          </label>

        ))}

      </div>

      <br />

      <div className="upload">

        <label className="upload-btn">

          Choose File

          <input
            type="file"
            hidden
            onChange={(e) => setMedia(e.target.files[0])}
          />

        </label>

        <span className="file-name">
          {media ? media.name : "No file chosen"}
        </span>

      </div>

      <br />

      <button className="save-btn" onClick={saveDraft}>
        {editingIndex !== null ? "Update Draft" : "Save Draft"}
      </button>

      <h2>Saved Drafts</h2>

      {drafts.length === 0 ? (
        <p>No drafts available.</p>
      ) : (
        drafts.map((draft, index) => (

          <div className="draft-card" key={index}>

            <p>
              <b>Post:</b> {draft.post}
            </p>

            <p>
              <b>Platform:</b> {draft.platform}
            </p>

            <p>
              <b>Media:</b> {draft.media}
            </p>

            <button
              className="edit-btn"
              onClick={() => editDraft(index)}
            >
              Edit
            </button>

            <button
              className="delete-btn"
              onClick={() => deleteDraft(index)}
            >
              Delete
            </button>

          </div>

        ))
      )}
    </div>
  );
}

export default App;