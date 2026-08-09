import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import postsData from "../data/posts";
import { isTokenExpired } from "../utils/auth";

function Viewer() {
  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem("user"));
  const totalPosts = postsData.length;

  
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

  
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className=" dashboard-container">
      <h1>Viewer Dashboard</h1>

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
    <h3>Access Level</h3>
    <h1>Viewer</h1>
  </div>
</div>

      <hr />

      <h3>Available Posts</h3>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Post Title</th>
          </tr>
        </thead>

        <tbody>
          {postsData.map((post) => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>{post.title}</td>
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

export default Viewer;