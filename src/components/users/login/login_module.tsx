import { LoginForm } from "./login_form";
import { useAuthActions } from "../../../hooks/auth/use_auth_actions";
import { SocialAuth } from "./social_auth";

export function LoginModule () {
  // 1. Grab the logic from our hook
  const { handleLogin, loading, error } = useAuthActions();

  return (
    <div className="auth-page-wrapper">
      {/* 2. Show the error if the service/hook catches one */}
      {error && <div className="error-message">{error}</div>}

      <SocialAuth />
      <p className ="separator"></p>
      
      {/* 3. Pass the handleLogin function as the submitHandler */}
      <LoginForm submitHandler={handleLogin} isLoading={loading} />

      {/* 4. Handle the loading state (Optional UI feedback) */}
      {loading && <div className="loader">Verifying credentials...</div>}
    </div>
  );
};
