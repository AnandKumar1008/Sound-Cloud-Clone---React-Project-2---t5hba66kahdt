import React, { useContext, useEffect, useState } from "react";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import GoogleIcon from "@mui/icons-material/Google";
import "./CreateAccount.css";
import AppleIcon from "@mui/icons-material/Apple";
import { FcGoogle } from "react-icons/fc";
import { MyContext } from "../../MyContext";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase";
import { useLocation, useNavigate } from "react-router-dom";
const CreateAccount = () => {
  const {
    loginPage,
    setLoginPage,
    setSongPlay,
    setUserName,
    setUserPhoto,
    setLogin,
    setIsPlaying,
    setCreateAccount,
  } = useContext(MyContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [userDetail, setUserDetail] = useState({
    name: "",
    password: "",
    email: "",
  });
  const [error, setError] = useState("");
  useEffect(() => {
    document.body.style.overflow = !loginPage ? "auto" : "hidden";
    if (loginPage) {
      setSongPlay([]);
    }
  }, [loginPage]);
  const handleLoginPage = () => {
    setLoginPage(false);
    setIsPlaying(false);
    setCreateAccount(false);
  };
  const handleSignUp = async () => {
    const url = "https://academics.newtonschool.co/api/v1/user/signup";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          projectId: "yji0muf36wd4",
        },
        body: JSON.stringify(userDetail),
      });

      const responseData = await response.json();
      console.log(responseData);
      setCreateAccount(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleClick = () => {
    if (userDetail.name.length < 3) {
      setError("name cannot be less than 3 characters");
      return;
    }
    if (userDetail.password.length < 6) {
      setError("password should be more than 6 characters");
      return;
    }
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!emailPattern.test(userDetail.email)) {
      setError("Invalid Email Adress");
      return;
    }
    handleSignUp();
  };

  const handleGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        setUserName(result.user.displayName);
        localStorage.setItem(
          "sound_cloud_google",
          JSON.stringify({
            userName: result.user.displayName,
            userPhoto: result.user.photoURL,
          })
        );
        console.log(result);
        setLogin(true);

        setUserPhoto(result.user.photoURL);
        setLoginPage(false);
        navigate("/home");
        console.log("coming here");
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  return (
    <div className={`sound_cloud-login ${loginPage ? "login_page" : ""}`}>
      <div className="sound_cloud-login_container">
        <div className="sound_cloud-login_container_close">
          <CloseRoundedIcon
            style={{ cursor: "pointer" }}
            onClick={handleLoginPage}
          />
        </div>
        <div className="sound_cloud-login_container_content">
          <button
            className="sound_cloud-login_button_google"
            onClick={handleGoogle}
          >
            <span style={{ padding: "0" }}>
              <FcGoogle style={{ fontSize: "1.2rem", padding: "0" }} />
            </span>{" "}
            <span>Continue with Google</span>
          </button>

          <div className="sound_cloud-login_middle_div">
            <span></span>
            <span>or</span>
            <span></span>
          </div>
          <p style={{ color: "red" }}>{error}</p>
          <input
            type="text"
            placeholder="User name"
            value={userDetail.name}
            onChange={(e) => {
              setError("");
              setUserDetail({ ...userDetail, name: e.target.value });
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={userDetail.password}
            onChange={(e) => {
              setError("");
              setUserDetail({ ...userDetail, password: e.target.value });
            }}
          />
          <input
            type="email"
            placeholder="Your Email Adress"
            value={userDetail.email}
            onChange={(e) => {
              setError("");
              setUserDetail({ ...userDetail, email: e.target.value });
            }}
          />
          <button
            className="sound_cloud-login_button_continue"
            onClick={handleClick}
          >
            Continue
          </button>
          <div className="sound_cloud-login_need_help">
            <p>Need Help ?</p>
          </div>
          <div className="sound_cloud-login_policy">
            <p>
              When registering, you agree that we may use your provided data for
              the registration and to send you notifications on our products and
              services. You can unsubscribe from notifications at any time in
              your settings. For additional info please refer to our Privacy
              Policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
