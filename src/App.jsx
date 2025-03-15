const App = () => {
  return (
    <div classname="login-container">
      <h2 classname="form-title"></h2>
        <div className="social-login">
          <button className="social-button">
            google SSO
          </button>
        </div>

        <p class="separator"><span>or</span></p>

        <form action="#" className="login-form">
          <div className="input-wrapper">
            <input type="email" className="input-field" placeholder="email" required />
            <i className="material-symbols-rounded">mail</i>
          </div>

          <div className="input-wrapper">
          <input type="password" className="password-field" required />
            <i className="material-symbols-rounded">lock</i>
          </div>

          <button classnmae="login-button">Log In</button>
        </form>

        <p className="signup-text">Don't have an account? <a href="#">Sign-up now</a></p>
    </div>
  )
}

export default App
