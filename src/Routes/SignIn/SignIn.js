import { useContext, useState } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import { UserContext } from "../../contexts/user.context";
import { signInWithGoogle } from "../../utils/firebase";
import "./SignIn.css";

const SignIn = () => {
  const { currentUser } = useContext(UserContext);
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  // Use effect for loading???
  return (
    <div className="SignIn Page">
      {currentUser && (
        <Navigate
          to={
            searchParams.get("redirect") || `/users-classes/${currentUser.uid}`
          }
        />
      )}
      <div className="signInBox">
        <span>You are not signed in, please sign in to use the app.</span>
        {loading ? (
          <span>LOADING</span>
        ) : (
          <span
            className="Button"
            onClick={() => {
              console.log(signInWithGoogle());
              setLoading(true);
            }}
          >
            Sign In
          </span>
        )}
      </div>
    </div>
  );
};

export default SignIn;
