import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import SocialLogin from "./social_login";
import InputField from "../../common/input_field";
import { LoginFormProps, userLoginInterface } from "../../../utils/interfaces";

export function LoginForm ({ submitHandler }: LoginFormProps)
{
  /* const navigate = useNavigate();

  const signupRedirect = () => {
    navigate('/signup');
  }; */
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<userLoginInterface>({
    defaultValues: {
      email: "",
      password: "",
    }
  });

  const onFormSubmit: SubmitHandler<userLoginInterface> = (data) => {
    submitHandler(data);
  };

  return (
    <div className="login-container">
        <SocialLogin />

        <p className ="separator"></p>

        <form onSubmit={handleSubmit(onFormSubmit)} className="login-form" data-testid="login-form">
          <div className="input-wrapper">
            <Controller
              name="email"
              control={control}
              rules={{
                required: {value: true, message: "Email is required"},
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address" 
                },
                minLength: {value: 6, message: "Email is too short"},
                maxLength: {value: 150, message: "Email name is too long"}
              }}
              render={({ field, fieldState: { error } }) => (
                <InputField
                  {...field}
                  type="email"
                  placeholder="Enter your email"
                  icon="mail"
                  error={errors.email?.message}
                />
              )}
            />
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
              render={({ field, fieldState: { error } }) => (
                <InputField
                  {...field}
                  type="password"
                  placeholder= "Enter your password"
                  icon="lock"
                  error={errors.password?.message}
                />
              )}
            />
          </div>

          <button className="login-button" data-testid="login-button" type="submit">Log In</button>
        </form>

        <p className="signup-text" data-testid="signup-text">Don't have an account? <Link to="/signup">Sign-up</Link> now</p>
        <p className="forgot-password-text" ><a href="#" className="forgot-password-link">Forgot Password?</a></p>
    </div>
  );
};