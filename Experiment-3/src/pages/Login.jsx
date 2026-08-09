import { useState } from "react";
import { useNavigate } from "react-router-dom";
import users from "../data/users";
import { generateToken } from "../utils/auth";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const user = users.find(
      (u) =>
        u.username === username &&
        u.password === password
    );

    if (!user) {
      setMessage("Invalid Username or Password");
      return;
    }

    // Generate Token
    const token = generateToken(user);

    // Store Token and User
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    setMessage("Login Successful!");

    // Redirect according to role
    if (user.role === "admin") {
      navigate("/admin");
    } else if (user.role === "editor") {
      navigate("/editor");
    } else {
      navigate("/viewer");
    }
  };

  return (
    <div className="login-page">
      <div className="container">
        <h1>JWT Authentication & RBAC</h1>
        <h3>Login</h3>

        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>
        </form>

        {message && (
          <p
            className={
              message.includes("Successful") ? "success" : "error"
            }
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default Login;