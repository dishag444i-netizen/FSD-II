import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import postsData from "../data/posts";
import { isTokenExpired } from "../utils/auth";

function Editor() {
  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem("user"));

  
  useEffect(() => {
    const interval = setInterval(() => {
      const token = localStorage.getItem("token");

      if (token && isTokenExpired(token)) {
        alert("Session expired. Please login again.");
        localStorage.clear();
        navigate("/");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [navigate]);

  const [posts, setPosts] = useState(postsData);
  const [title, setTitle] = useState("");
  const [editId, setEditId] = useState(null);
  const totalPosts = posts.length;
const editablePosts = posts.length;

  
  const handleSubmit = () => {
    if (title.trim() === "") {
      alert("Please enter a post title");
      return;
    }

    if (editId !== null) {
      const updatedPosts = posts.map((post) =>
        post.id === editId ? { ...post, title } : post
      );

      setPosts(updatedPosts);
      setEditId(null);
    } else {
      const newPost = {
        id: posts.length + 1,
        title,
      };

      setPosts([...posts, newPost]);
    }

    setTitle("");
  };

  
  const handleEdit = (post) => {
    setTitle(post.title);
    setEditId(post.id);
  };

  
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="dashboard-container">
      <h1>Editor Dashboard</h1>

      <h2>Welcome, {currentUser.username}</h2>

      <p>
        <strong>Role:</strong> {currentUser.role}
      </p>
<div className="stats">
  <div className="card">
    <h3>Total Posts</h3>
    <h1>{totalPosts}</h1>
  </div>

  <div className="card">
    <h3>Editable Posts</h3>
    <h1>{editablePosts}</h1>
  </div>
</div>
      <hr />

      <h3>{editId ? "Update Post" : "Create Post"}</h3>

      <input
        type="text"
        placeholder="Enter Post Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <br />

      <button onClick={handleSubmit}>
        {editId ? "Update Post" : "Create Post"}
      </button>

      <hr />

      <h2>Available Posts</h2>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Post Title</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>{post.title}</td>
              <td>
                <button onClick={() => handleEdit(post)}>
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <br />

      <button
        className="dashboard"
        onClick={() => navigate("/dashboard")}
      >
        View Dashboard
      </button>

      <button
        className="logout"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}

export default Editor;