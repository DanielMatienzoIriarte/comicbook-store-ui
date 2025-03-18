import React from "react";
import InputField from "./input_field";

const SignupForm = () =>
{
  return (
    <div className="signup-container">
      <h2 className="form-title">Sign Up</h2>

      <form action="#" className="signup-form">
        <InputField type="text" placeholder="Full name" icon="person" />

        <InputField type="email" placeholder="Email address" icon="mail" />

        <InputField type="password" placeholder="Password" icon="lock" />

        <button className="signup-button">Sign Up</button>
      </form>

      <p className="login-text">Have an account already? <a href="#">Sign-in</a> now</p>
    </div>
  );
};

export default SignupForm;