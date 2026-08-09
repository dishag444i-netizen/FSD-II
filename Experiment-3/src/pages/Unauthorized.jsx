import { Link } from "react-router-dom";

function Unauthorized() {
  return (
    <div className="container">
      <h1>🚫 403 - Unauthorized</h1>

      <p>
        You don't have permission to access this page.
      </p>

      <br />

      <Link to="/">
        <button>Go to Login</button>
      </Link>
    </div>
  );
}

export default Unauthorized;