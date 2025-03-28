import React, { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import { userInterface } from "../../../utils/interfaces";
import { postUser } from "../../../utils/service_managr";

const SignupForm = () =>
{
  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<userInterface>({
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
    }
  });

  const onSubmit: SubmitHandler<userInterface> = (data) => {
    postUser(data);
  };

  const [isPasswordDisplayed, setIsPasswordDisplayed] = useState(false);

  return (
    <div className="signup-container">
      <h2 className="form-title">Sign Up</h2>

      <form className="signup-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="input-wrapper">
          <Controller
            name="fullname"
            control={control}
            rules={{
              required: {value: true, message: "Full name is required"},
              minLength: {value: 6, message: "Full name is too short"},
              maxLength: {value: 50, message: "Full name is too long"}
            }}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                className="input-field"
                placeholder={"Full Name"}
              />
            )}
          />
          <i className="material-symbols-rounded">person</i>

          {errors.fullname && <span className="form-error-message" style={{ color:'red' }}>{errors.fullname?.message}</span>}
        </div>

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
          <i className="material-symbols-rounded">email</i>

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

        <input type="submit" className="signup-button" value="Sign Up" />
      </form>

      <p className="login-text">Have an account already? <Link to="/login">Sign-in</Link> now</p>
    </div>
  );
};

export default SignupForm;