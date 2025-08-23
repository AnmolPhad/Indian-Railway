import { Link } from "react-router-dom";
import "../styles/Auth.css";

export default function Register() {
  function onSubmit(e){ e.preventDefault(); /* add registration later */ }
  return (
    <div className="authWrap">
      <div className="authCard">
        <h2>Register</h2>
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

          <label>Re-enter Password</label>
          <div className="inputRow">
            <input type="password" required />
            <i className="iconRight fas fa-lock" />
          </div>

          <button className="authBtn" type="submit">Register</button>
        </form>
        <Link to="/login" className="link">Already have an account? Login</Link>
      </div>
    </div>
  );
}
