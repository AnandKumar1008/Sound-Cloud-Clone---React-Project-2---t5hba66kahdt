import React from "react";
import "./Messages.css";
import { BiMessageDetail } from "react-icons/bi";
const Messages = () => {
  return (
    <div className="sound_cloud-notification">
      <div className="sound_cloud-notification_heading">
        <h2>Messages</h2>
        <p
          style={{
            display: "inline",
            color: "white",
            backgroundColor: "orangered",
            padding: "0.25rem",
            borderRadius: "0.25rem",
          }}
        >
          New Message
        </p>
      </div>
      <div className="sound_cloud-notification_middle">
        <div>
          <BiMessageDetail
            style={{
              opacity: "0.3",
              fontSize: "30rem",
            }}
          />
          <p>You have no messages</p>
          <p>Send someone a message and make their day. Write one</p>
        </div>
      </div>
    </div>
  );
};

export default Messages;
