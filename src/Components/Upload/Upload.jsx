import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Upload.css";
import UploadNav from "../UploadNav/UploadNav";
import UploadComp from "../UploadComp/UploadComp";
import YourTracks from "../YourTracks/YourTracks";
const Header = () => {
  return (
    // <div className="sound_cloud-upload_header">
    //   <p>
    //     Almost there! Verify your email address to start uploading. An email was
    //     sent to harekrishnahareramaharehare@gmail.
    //   </p>
    //   <p>
    //     Didn't get the email? <button>Resend email</button> or change your
    //     address
    //   </p>
    // </div>
    <></>
  );
};
const Upload = () => {
  const [choice, setChoice] = useState("Upload");
  return (
    <div className="sound_cloud-upload">
      {choice === "Upload" ? <Header /> : <></>}
      <div className="sound_cloud_upload-middle_padding">
        <UploadNav setChoice={setChoice} choice={choice} />
        {choice === "Upload" ? <UploadComp /> : <YourTracks />}
      </div>
    </div>
  );
};

export default Upload;
