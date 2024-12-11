import { useState } from "react";
import { SignupForm } from "../components/auth/SignupForm";
import { LoginForm } from "../components/auth/LoginForm";

export function SpeakerAuthPage() {
  const [isSignup, setIsSignup] = useState(true);

  return (
    <div className="speaker-auth">
      <h2>{isSignup ? "Speaker Signup" : "Speaker Login"}</h2>
      {isSignup ? <SignupForm /> : <LoginForm />}
      <p>
        {isSignup ? (
          <span>
            Already have an account?{" "}
            <button onClick={() => setIsSignup(false)}>Login</button>
          </span>
        ) : (
          <span>
            Don't have an account?{" "}
            <button onClick={() => setIsSignup(true)}>Sign Up</button>
          </span>
        )}
      </p>
    </div>
  );
}
