import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import SocialLogin from "./social_login";
import { userLoginInterface } from "../../../utils/interfaces";
import { login } from "../../../utils/service_managr";

const LoginForm = () =>
{
  /* const navigate = useNavigate();

  const signupRedirect = () => {
    navigate('/signup');
  }; */
  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<userLoginInterface>({
    defaultValues: {
      email: "",
      password: "",
    }
  });

  const [isPasswordDisplayed, setIsPasswordDisplayed] = useState(false);

  const onSubmit: SubmitHandler<userLoginInterface> = (data) => {
    login(data);
  };

  return (
    <div className="login-container">
      <h2 className="form-title"></h2>
        <SocialLogin />

        <p className ="separator"><span>or</span></p>

        <form onSubmit={handleSubmit(onSubmit)} className="login-form">
          <div className="input-wrapper">
            <Controller
              name="email"
              control={control}
              rules={{
                required: {value: true, message: "Email is required"},
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "invalid email address"
                },
                minLength: {value: 9, message: "Email is too short"},
                maxLength: {value: 150, message: "Email name is too long"}
              }}
              render={({ field }) => <input {...field} type="email" className="input-field" placeholder="Email address" />}
            />
            <i className="material-symbols-rounded">mail</i>

            {errors.email && <span className="form-error-message" style={{ color:'red' }}>{errors.email?.message}</span>}
          </div>

          <div className="input-wrapper">
            <Controller
              name="password"
              control={control}
              rules={{
                required: {value: true, message: "Password is required"},
                minLength: {value: 8, message: "Password is too short"},
                maxLength: {value: 16, message: "Password is too long"}
              }}
              render={({ field }) => <input {...field} type={ isPasswordDisplayed ? 'text' : 'password' } className="input-field" placeholder={"Password"} />}
            />
            <i className="material-symbols-rounded">lock</i>
            <i 
              onClick={ () => setIsPasswordDisplayed(prevState => !prevState) }
              className="material-symbols-rounded eye-icon"
            >
              { isPasswordDisplayed ? 'visibility' : 'visibility_off' }
            </i>

            {errors.password && <span className="form-error-message" style={{ color:'red' }}>{errors.password?.message}</span>}
          </div>

          <a href="#" className="forgot-password-link">Forgot Password?</a>

          <button className="login-button">Log In</button>
        </form>

        <p className="signup-text">Don't have an account? <Link to="/signup">Sign-up</Link> now</p>
    </div>
  );
};

export default LoginForm;