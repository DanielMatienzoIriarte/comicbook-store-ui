import React, { useRef, useState, useEffect } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { userInterface } from "../../../utils/interfaces";
import InputField from "./input_field";

const SignupForm = () =>
{
  const {
    register,
    control,
    handleSubmit,
  } = useForm<userInterface>({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    }
  });

  const onSubmit: SubmitHandler<userInterface> = (data) => {
    console.log('666', data);
  };

  const [isPasswordDisplayed, setIsPasswordDisplayed] = useState(false);

  const navigate = useNavigate();
  
  const loginRedirect = () => {
    navigate('/login');
  };

  return (
    <div className="signup-container">
      <h2 className="form-title">Sign Up</h2>

      <form className="signup-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="input-wrapper">
          <Controller
            name="fullName"
            control={control}
            rules={{ required:true, maxLength:120 }}
            render={({ field }) => <input {...field} type="text" className="input-field" placeholder={"Full Name"} />}
          />
          <i className="material-symbols-rounded">person</i>
        </div>

        <div className="input-wrapper">
          <Controller
            name="email"
            control={control}
            rules={{ required:true, maxLength:120 }}
            render={({ field }) => <input {...field} type="email" className="input-field" placeholder={"Email address"} />}
          />
          <i className="material-symbols-rounded">email</i>
        </div>

        <div className="input-wrapper">
          <Controller
            name="password"
            control={control}
            rules={{ required:true, minLength:9, maxLength:16 }}
            render={({ field }) => <input {...field} type={ isPasswordDisplayed ? 'text' : 'password' } className="input-field" placeholder={"Password"} />}
          />
          <i className="material-symbols-rounded">lock</i>
          <i 
            onClick={ () => setIsPasswordDisplayed(prevState => !prevState) }
            className="material-symbols-rounded eye-icon"
          >
            { isPasswordDisplayed ? 'visibility' : 'visibility_off' }
          </i>
        </div>

        <input type="submit" className="signup-button" value="Sign Up" />
      </form>

      <p className="login-text">Have an account already? <a href="#" onClick={loginRedirect}>Sign-in</a> now</p>
    </div>
  );
};

export default SignupForm;