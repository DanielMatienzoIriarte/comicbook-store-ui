// src/components/auth/social_auth.tsx
import { useAuthActions } from "../../../hooks/auth/use_auth_actions";

export function SocialAuth() {
  const { handleGoogleLogin, loading } = useAuthActions();

  return (
    <div className="social-auth-container">
      <div className="divider">
        <span>OR</span>
      </div>
      
      <button 
        type="button" 
        className="google-sso-button" 
        onClick={handleGoogleLogin}
        disabled={loading}
      >
        <img src="/google-icon.svg" alt="Google" />
        {loading ? "Redirecting..." : "Continue with Google"}
      </button>
    </div>
  );
}