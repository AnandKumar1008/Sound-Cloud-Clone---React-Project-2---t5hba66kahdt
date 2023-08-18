import React, { useContext, useEffect } from "react";
import RightSide from "../RightSide/RightSide";
import "./FeedComp.css";
import { useSelector } from "react-redux";
import Track from "../Track/Track";
import { MyContext } from "../../MyContext";
const FeedComp = () => {
  const reposted = useSelector((state) => state.reposts.reposts);
  const { setSongPlay } = useContext(MyContext);
  return (
    <div className="sound_cloud-feed_comp">
      <div className="sound_cloud-feed_comp_container">
        <div className="sound_cloud-feed_omp_left">
          <h3>Hear the latest posts from the people you’re following:</h3>
          <p>
            Your feed is currently empty. Go to search or home to find creators
            to follow. Come back to the feed to see tracks they are posting.
          </p>
          <div className="sound_cloud-feed_comp_margin">
            {reposted.map((item, i, self) => (
              <div key={item._id} style={{ margin: "1rem 0" }}>
                <Track song={item} index={i} self={self} />
              </div>
            ))}
          </div>
        </div>
        <div className="sound_cloud-feed_comp_right">
          <RightSide />
        </div>
      </div>
    </div>
  );
};

export default FeedComp;
