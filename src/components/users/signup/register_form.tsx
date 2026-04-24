import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import InputField from "../../common/input_field";
import { RegisterFormProps, userRegisterInterface } from "../../../interfaces/interfaces";

const RegisterForm = ({ submitHandler, isLoading }: RegisterFormProps) =>
{
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<userRegisterInterface>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      password_confirmation: "",
    }
  });

  // We "watch" the password field to compare it with the confirmation field
  const password = watch("password");

  const onFormSubmit: SubmitHandler<userRegisterInterface> = (data) => {
    submitHandler(data);
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit(onFormSubmit)} className="register-form" data-testid="register-form">
        
        {/* Username Field */}
        <div className="input-wrapper">
          <Controller
            name="username"
            control={control}
            rules={{ 
              required: "Username is required",
              minLength: { value: 3, message: "Username is too short" }
            }}
            render={({ field }) => (
              <InputField
                {...field}
                type="text"
                placeholder="Choose a username"
                icon="user"
                error={errors.username?.message}
              />
            )}
          />
        </div>

        {/* Email Field */}
        <div className="input-wrapper">
          <Controller
            name="email"
            control={control}
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address"
              }
            }}
            render={({ field }) => (
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

        {/* Password Field */}
        <div className="input-wrapper">
          <Controller
            name="password"
            control={control}
            rules={{
              required: "Password is required",
              minLength: { value: 8, message: "Minimum 8 characters" }
            }}
            render={({ field }) => (
              <InputField
                {...field}
                type="password"
                placeholder="Create a password"
                icon="lock"
                error={errors.password?.message}
              />
            )}
          />
        </div>

        {/* Password Confirmation Field */}
        <div className="input-wrapper">
          <Controller
            name="password_confirmation"
            control={control}
            rules={{
              required: "Please confirm your password",
              validate: (value) => value === password || "Passwords do not match"
            }}
            render={({ field }) => (
              <InputField
                {...field}
                type="password"
                placeholder="Confirm your password"
                icon="shield"
                error={errors.password_confirmation?.message}
              />
            )}
          />
        </div>

        <button 
          className="register-button" 
          type="submit" 
          disabled={isLoading}
        >
          {isLoading ? "Creating Account..." : "Sign Up"}
        </button>
      </form>

      <p className ="separator"></p>

      <p className="login-text">
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </div>
  );
}

export default RegisterForm;