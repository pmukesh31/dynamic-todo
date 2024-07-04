import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "./security/AuthProvider";

export default function LoginComponent() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [failureMessage, setFailureMessage] = useState(false);

  const navigate = useNavigate();

  const context = useAuth();

  function handleUserName(event) {
    setUsername(event.target.value);
  }

  function handlePassword(event) {
    setPassword(event.target.value);
  }

  async function handleSubmit() {
    if (await context.login(username, password)) {
      navigate(`/welcome/${username}`);
    } else {
      setFailureMessage(true);
    }
  }

  return (
    <div className="Login">
      {failureMessage && (
        <div className="failure">Oops! Wrong Credentials. Try Again</div>
      )}
      <div className="LoginForm">
        <div>
          <label htmlFor="">User Name</label>
          <input type="text" value={username} onChange={handleUserName} />
        </div>
        <div>
          <label htmlFor="">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handlePassword}
          />
        </div>
        <div>
          <button type="button" name="login" onClick={handleSubmit}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
