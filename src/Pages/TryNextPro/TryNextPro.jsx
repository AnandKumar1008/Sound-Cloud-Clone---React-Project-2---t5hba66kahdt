import React from "react";
import "./TryNextPro.css";
import { TfiInfinite } from "react-icons/tfi";
import { BsCoin, BsStar } from "react-icons/bs";
import { PiSpiral } from "react-icons/pi";
import { TiTick } from "react-icons/ti";
import { Footer } from "../../Components/Sound/Sound";
const TryNextPro = () => {
  return (
    <div className="sound_cloud-try_next_pro">
      <div className="sound_cloud-try_next_pro_image_part">
        <div className="sound_cloud-try_next_pro_text_cover">
          <div className="sound_cloud-try_next_pro_image_texts">
            <h1>Get Next Pro for $99/year</h1>
            <h3>
              Unlock the power of SoundCloud with our best plan for artists.
            </h3>
            <h5>* Discount applies only to first year of subscription.</h5>
            <button>Get started</button>
          </div>
          <div className="sound_cloud-try_next_pro_bottom_text">
            <span>
              <p>
                <TfiInfinite />
              </p>
              <div>
                <h3>Unlimited uploads</h3>
                <p>
                  Upload as much music as you want with your community and
                  collaborators
                </p>
              </div>
            </span>
            <span>
              <p>
                <BsCoin />
              </p>
              <div>
                <h3>Get paid</h3>
                <p>
                  Distribute your music on SoundCloud, Spotify, YouTube, and
                  more
                </p>
              </div>
            </span>
            <span>
              <p>
                <BsStar />
              </p>
              <div>
                <h3>Build your Brand</h3>
                <p>Unlock advanced profile controls and promote your tracks</p>
              </div>
            </span>
            <span>
              <p>
                <PiSpiral />
              </p>
              <div>
                <h3>Grow your Audience</h3>
                <p>
                  Find who and where your fans are to plan promotion, releases,
                  and tours
                </p>
              </div>
            </span>
          </div>
        </div>
      </div>
      <h1>Available plans.</h1>
      <section className="sound-cloud-try_next_pro_middle">
        <div className="sound_cloud-try_next_pro_middle_next">
          <div>
            <h2>Next</h2>
            <p>Free</p>
            <button>You're on Next</button>
            <p>
              <TiTick /> Up to 3 hours of track uploads
            </p>
            <p>
              <TiTick /> Share private tracks with collaborators
            </p>
            <p>
              <TiTick /> Post public tracks and hear from fans
            </p>
            <p>
              <TiTick /> Basic fan insights
            </p>
          </div>
        </div>
        <div className="sound_cloud-try_next_pro_middle">
          <div className="sound_cloud-try_next_pro_middle_next_pro">
            <h2>Next Pro</h2>
            <p>Starting at $8.25 / month</p>
            <button>Get Next Pro</button>
            Everything in Next and...
            <p>
              <TiTick /> Unlimited track uploads
            </p>
            <p>
              <TiTick /> Unlimited distribution to Spotify, Apple Music, TikTok,
              and more
            </p>
            <p>
              <TiTick /> Custom profile control including track spotlight
            </p>
            <p>
              <TiTick /> Track management tools
            </p>
            <p>
              <TiTick /> Advanced fan insights and custom listening reports
            </p>
            <p>
              <TiTick /> Exclusive partner offers from Splice and more
            </p>
            <p>
              <TiTick /> 3 free Mastering credits each month
            </p>
            <p>
              <TiTick /> Premium profile badge
            </p>
          </div>
        </div>
      </section>
      <Footer />
      <section className="sound_cloud-try_next_pro_compare">
        <table></table>
      </section>
    </div>
  );
};

export default TryNextPro;
