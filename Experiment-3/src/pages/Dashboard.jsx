import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { isTokenExpired } from "../utils/auth";

function Dashboard() {
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
const totalApiPosts = posts.length;
const apiStatus = "Connected";
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

  useEffect(() => {
    api
      .get("/posts?_limit=5")
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>

      <h2>Posts from API</h2>
<div className="stats">
  <div className="card">
    <h3>API Posts</h3>
    <h1>{totalApiPosts}</h1>
  </div>

  <div className="card">
    <h3>API Status</h3>
    <h1>{apiStatus} ✅</h1>
  </div>
</div>

<h2>Posts from API</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Post Title</th>
          </tr>
        </thead>

        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>{post.title}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <br />

      <button onClick={() => navigate(-1)}>
        Back
      </button>
    </div>
  );
}

export default Dashboard;