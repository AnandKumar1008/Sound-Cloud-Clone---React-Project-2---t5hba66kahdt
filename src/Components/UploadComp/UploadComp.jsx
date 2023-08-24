import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Footer } from "../Sound/Sound";
import "./UploadComp.css";
const BasicInfo = ({ inp, setInp }) => {
  const dispatch = useDispatch();
  return (
    <div className="sound_cloud-basic_info">
      <h1>Basic Info</h1>
      <p>Title *</p>
      <input
        id="title"
        type="text"
        value={inp.title}
        onChange={(e) => setInp({ ...inp, title: e.target.value })}
      />
      <div className="sound_cloud-basic_info_button">
        <button style={{ color: "black", backgroundColor: "white" }}>
          Cancel
        </button>
        <button
          onClick={() => {
            dispatch({ type: "UPLOAD", payload: inp });
            setInp("");
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
};
const UploadComp = () => {
  const inpRef = useRef();
  const [inp, setInp] = useState({});
  const upload = useSelector((state) => state.uploads.uploads);
  const handleChange = (e) => {
    const allowedAudioTypes = ["audio/mpeg", "audio/wav", "audio/ogg"];
    const selectedFile = e.target.files[0];
    if (selectedFile && allowedAudioTypes.includes(selectedFile.type)) {
      const audioUrl = URL.createObjectURL(selectedFile);
      setInp({ title: "", audioUrl });
      console.log(audioUrl);
    }
  };
  return (
    <div className="sound_cloud-upload_comp_cover">
      <div className="sound_cloud-upload_middle_area">
        <div className="sound_cloud-upload_free_uploads">
          {/* <div className="sound_cloud-upload_comp_padding">
            <div className="sound_cloud-upload_free_uploads_left_part">
              <span>
                <p>0% free uploads used</p>
               
              </span>
              <div
                className="sound_cloud-upload_fill"
                style={{
                  backgroundColor: "var(--color-para-text-light)",
                  margin: "0.5rem 0",
                }}
              ></div>
              <p>Try Next pro to get unlimited uploads</p>
            </div>
            <div className="sound_cloud-upload_comp_try_next_pro">
              <button>Try Next Pro</button>
            </div>
          </div> */}
        </div>
        {inp?.audioUrl ? (
          <BasicInfo inp={inp} setInp={setInp} />
        ) : (
          <div className="sound_cloud-sound_drag_drop">
            <h3>Drag and drop your tracks & albums here</h3>
            <div className="sound_cloud-upload_comp_upload_btn">
              <input
                type="file"
                ref={inpRef}
                name=""
                id=""
                style={{ display: "none" }}
                onChange={handleChange}
              />
              <audio
                src={inp}
                loop
                controls
                autoPlay
                style={{ display: "none" }}
              />
              <button
                onClick={() => inpRef.current.click()}
                style={{
                  backgroundColor: "orangered",
                  color: "var(--color-btn-text)",
                  cursor: "pointer",
                }}
              >
                or Choose Files to Upload
              </button>
              {/* <input type="file" /> */}
              {/* <div className="sound_cloud-upload_check">
              <input type="checkbox" id="check_multiple" />
              <label htmlFor="check_multiple">
                Make a playLIst when Multiple Files are Selected
              </label>
            </div> */}
              {/* <div className="sound_cloud-upload_privacy">
              <p>Privacy</p> <input type="checkbox" />{" "}
              <label htmlFor="">Public</label>
              <input type="checkbox" /> <label htmlFor="">Private</label>
            </div> */}
            </div>
            {/* <div className="sound_cloud-upload_comp_last">
            <p>
              Provide FLAC, WAV, ALAC, or AIFF for highest audio quality. Learn
              more about lossless HD.
            </p>
          </div> */}
          </div>
        )}
        <div className="sound_cloud-sound_drag_go_to_track">
          {upload.map((item, i) => (
            <div key={i} style={{ margin: "1rem 0" }}>
              <audio src={item.audioUrl} controls autoPlay={false} />
              <p style={{ color: "skyblue", cursor: "pointer" }}>
                {item.title}
              </p>
              {/* <p>{item.audioUrl}</p> */}
              <p>Upload Complete</p>
              <h6 style={{ cursor: "pointer" }}> Go to Your Track</h6>
            </div>
          ))}
        </div>
      </div>
      <div className="sound_cloud-upload_comp_footer">
        <Footer />
      </div>
    </div>
  );
};

export default UploadComp;
