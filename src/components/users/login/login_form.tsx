import React from "react";
import { useNavigate, Link } from "react-router-dom";
import InputField from "./input_field";
import SocialLogin from "./social_login";

const LoginForm = () =>
{
  /* const navigate = useNavigate();

  const signupRedirect = () => {
    navigate('/signup');
  }; */

  return (
    <div className="login-container">
      <h2 className="form-title"></h2>
        <SocialLogin />

        <p className ="separator"><span>or</span></p>

        <form action="#" className="login-form">
          <InputField type="email" placeholder="Email address" icon="mail" />

          <InputField type="password" placeholder="Password" icon="lock" />

          <a href="#" className="forgot-password-link">Forgot Password?</a>

          <button className="login-button">Log In</button>
        </form>

        <p className="signup-text">Don't have an account? <Link to="/signup">Sign-up</Link> now</p>
    </div>
  );
};

export default LoginForm;