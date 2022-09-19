import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";

import "./LoginForm.css"

function LoginForm({ onLogin }) {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    const response = dispatch(sessionActions.login({ credential, password }))
      .then(() => {
        onLogin()
      })
      .catch(
        async (res) => {
          const data = await res.json();
          if (data && data.message) setErrors([data.message]);
        }
      );
  };

  const loginDemoUser = (e) => {
    e.preventDefault();
    setErrors([]);
    const response = dispatch(sessionActions.login({ credential: "Demo", password: "password" }))
      .then(() => {
        onLogin()
      })
      .catch(
        async (res) => {
          const data = await res.json();
          if (data && data.message) setErrors([data.message]);
        }
      );
  }

  return (
    <>
      <div className="header-div">
        Log in
      </div>
      <div className="content-div">
        <div className="content-header">
          Welcome to Lairbnb
        </div>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="errors">
            {errors.map((error, idx) => <div key={idx}>{error}</div>)}
          </div>
          <div className="input-container">
            <label
              for="credential"
            >
              Username or Email
            </label>
            <input
              id="credential"
              type="text"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              className="input"
              required
            />
          </div>
          <div className="input-container">
            <label>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              required
            />
          </div>
          <div className="button-container">
            <button type="submit" className="submit-button">Log in</button>
          </div>
          <div className="button-container">
            <button onClick={loginDemoUser} className="submit-button">Log in as demo user</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default LoginForm;