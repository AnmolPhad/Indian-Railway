import { Link } from "react-router-dom";
import "../styles/Auth.css";

export default function Login() {
  function onSubmit(e){ e.preventDefault(); /* add auth later */ }
  return (
    <div className="authWrap">
      <div className="authCard">
        <h2>Login</h2>
        <form onSubmit={onSubmit}>
          <label>Email</label>
          <div className="inputRow">
            <input type="email" required />
            <i className="iconRight fas fa-envelope" />
          </div>

          <label>Password</label>
          <div className="inputRow">
            <input type="password" required />
            <i className="iconRight fas fa-lock" />
          </div>

          <button className="authBtn" type="submit">Login</button>
        </form>
        <Link to="/register" className="link">Don't have an account? Register</Link>
      </div>
    </div>
  );
}
