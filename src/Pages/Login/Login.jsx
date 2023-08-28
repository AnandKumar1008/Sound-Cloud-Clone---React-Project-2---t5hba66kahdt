import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useLocation, useNavigate } from "react-router-dom";
import { MyContext } from "../../MyContext";
import { auth, provider } from "../../firebase";
import "./Login.css";
const Login = () => {
  const {
    loginPage,
    setLoginPage,
    setUserName,
    setUserPhoto,
    login,
    setLogin,
    setIsPlaying,
  } = useContext(MyContext);
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const [userDetail, setUserDetail] = useState({ email: "", password: "" });
  useEffect(() => {
    document.body.style.overflow = !loginPage ? "auto" : "hidden";
    if (loginPage) {
      // setSongPlay([]);
      setIsPlaying(false);
    }
  }, [loginPage]);
  const handleLoginPage = () => {
    setLoginPage(false);
    setIsPlaying(false);
    if (!login)
      if (
        location.pathname.includes("/feed") ||
        location.pathname.includes("/library")
      ) {
        navigate("/home");
        console.log("running");
      }
  };
  const handleGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        setUserName(result.user.displayName);
        const userName = result.user.displayName;
        const userPhoto = result.user.photoURL;
        localStorage.setItem(
          "sound_cloud_google",
          JSON.stringify({
            userName,
            userPhoto,
          })
        );

        const data = {
          userName,
          userPhoto,
        };

        axios
          .post(
            "https://soundcloudclone-85e36-default-rtdb.firebaseio.com/data.json",
            data
          )
          .then((response) => {
            // console.log("Data posted successfully:", response);
          })
          .catch((error) => {
            // console.error("Error posting data:", error);
          });
        // console.log(result);
        setLogin(true);
        // setLogin(true);
        // setShowForm("none");
        setUserPhoto(result.user.photoURL);
        setLoginPage(false);
        navigate("/home");
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  const handleLogin = async () => {
    const url = "https://academics.newtonschool.co/api/v1/user/login";
    const data = {
      email: userDetail.email,
      password: userDetail.password,
    };
    console.log(userDetail);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          projectId: "yji0muf36wd4", // Your provided project ID
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (response.ok) {
        const token = responseData.token;
        console.log("Token:", token);
        localStorage.setItem("sound_cloud_token", JSON.stringify(token));

        setUserName(responseData.data.name);
        setLogin(true);
        setLoginPage(false);
        navigate("/home");
        // Save the token to a secure storage mechanism
      } else {
        console.error("Login was not successful:", responseData);
        // Handle unsuccessful login here
        setError("Login was not successful! Try using Google");
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle errors here
      setError("Something Went Wrong! Try login with google");
    }
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
          {/* <button className="sound_cloud-login_button_facebook">
            <span>
              <FacebookRoundedIcon />
            </span>
            <span>Continue With Facebook</span>
          </button> */}
          <button
            className="sound_cloud-login_button_google"
            onClick={handleGoogle}
          >
            <span style={{ padding: "0" }}>
              <FcGoogle style={{ fontSize: "1.2rem", padding: "0" }} />
            </span>{" "}
            <span>Continue with Google</span>
          </button>
          {/* <button className="sound_cloud-login_button_apple">
            <span>
              <AppleIcon />{" "}
            </span>{" "}
            <span>Continue With Apple</span>
          </button> */}
          <div className="sound_cloud-login_middle_div">
            <span></span>
            <span>or</span>
            <span></span>
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <input
            type="email"
            placeholder="Your Email Adress"
            value={userDetail.email}
            onChange={(e) => {
              setUserDetail({ ...userDetail, email: e.target.value });
              setError("");
            }}
          />
          <input
            type="password"
            placeholder="Enter Your Password"
            value={userDetail.password}
            onChange={(e) => {
              setUserDetail({ ...userDetail, password: e.target.value });
              setError("");
            }}
          />
          <button
            className="sound_cloud-login_button_continue"
            onClick={handleLogin}
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

export default Login;
