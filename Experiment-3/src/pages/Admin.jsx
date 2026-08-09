import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import usersData from "../data/users";
import { isTokenExpired } from "../utils/auth";

function Admin() {
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

  const [users, setUsers] = useState(usersData);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("viewer");
  const [editId, setEditId] = useState(null);

const totalUsers = users.length;
const totalAdmins = users.filter(user => user.role === "admin").length;
const totalEditors = users.filter(user => user.role === "editor").length;
const totalViewers = users.filter(user => user.role === "viewer").length;

  const handleSubmit = () => {
    if (!username || !password) {
      alert("Please fill all fields");
      return;
    }

    if (editId) {
      setUsers(
        users.map((user) =>
          user.id === editId
            ? { ...user, username, password, role }
            : user
        )
      );
      setEditId(null);
    } else {
      const newUser = {
        id: users.length + 1,
        username,
        password,
        role,
      };

      setUsers([...users, newUser]);
    }

    setUsername("");
    setPassword("");
    setRole("viewer");
  };

  
  const handleEdit = (user) => {
    setUsername(user.username);
    setPassword(user.password);
    setRole(user.role);
    setEditId(user.id);
  };

  
  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className=" dashboard-container">
      <h1>Admin Dashboard</h1>

      <h2>Welcome, {currentUser.username}</h2>

      <p>
        <strong>Role:</strong> {currentUser.role}
      </p>
      <div className="stats">
  <div className="card">
    <h3>Total Users</h3>
    <h1>{totalUsers}</h1>
  </div>

  <div className="card">
    <h3>Total Admins</h3>
    <h1>{totalAdmins}</h1>
  </div>

  <div className="card">
    <h3>Total Editors</h3>
    <h1>{totalEditors}</h1>
  </div>

  <div className="card">
    <h3>Total Viewers</h3>
    <h1>{totalViewers}</h1>
  </div>
</div>

      <hr />

      <h3>{editId ? "Update User" : "Create User"}</h3>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="admin">Admin</option>
        <option value="editor">Editor</option>
        <option value="viewer">Viewer</option>
      </select>

      <br />

      <button onClick={handleSubmit}>
        {editId ? "Update User" : "Create User"}
      </button>

      <hr />

      <h2>Users</h2>

      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => handleEdit(user)}>
                  Edit
                </button>

                <button onClick={() => handleDelete(user.id)}>
                  Delete
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

export default Admin;