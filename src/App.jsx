import InputField from "./books/components/input_field"
import SocialLogin from "./books/components/social_login"

const App = () => {
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

        <p className="signup-text">Don't have an account? <a href="#">Sign-up now</a></p>
    </div>
  )
}

export default App
