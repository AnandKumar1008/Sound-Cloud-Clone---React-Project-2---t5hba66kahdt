import React from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import "./Notification.css";
const Notification = () => {
  return (
    <div className="sound_cloud-notification">
      <div className="sound_cloud-notification_heading">
        <h2>Notification</h2>
        <p
          style={{
            display: "inline",
            color: "white",
            backgroundColor: "orangered",
            padding: "0.25rem",
            borderRadius: "0.25rem",
          }}
        >
          New Notification
        </p>
      </div>
      <div className="sound_cloud-notification_middle">
        <div>
          <IoMdNotificationsOutline
            style={{
              opacity: "0.3",
              fontSize: "30rem",
            }}
          />
          <p>You have no notification</p>
          <p>Send someone a notifications and make their day. Write one</p>
        </div>
      </div>
    </div>
  );
};

export default Notification;
