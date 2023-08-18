import React from "react";
import "./Login.css";
const Login = () => {
  return (
    <div className="sound_cloud-login">
      <div className="sound_cloud-login_container">
        <div className="sound_cloud-login_container_close">
          <button>Close</button>
        </div>
        <div className="sound_cloud-login_cover">
          <div className="sound_cloud-login_buttons">
            <button>Continue With FaceBook</button> <br />
            <button>Continue With Google</button>
            <br />
            <button>Continue with Apple</button>
            <br />
          </div>
          <div className="sound_cloud-login_or">
            <div></div>
            <p>or</p>
            <div></div>
          </div>
          <div className="sound_cloud-login_input_button">
            <input type="text" />
            <button> Continue</button>
          </div>
          <div className="sound_cloud-login_footer">
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
