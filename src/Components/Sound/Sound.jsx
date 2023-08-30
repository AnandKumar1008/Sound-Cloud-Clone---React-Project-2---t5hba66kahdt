import axios from "axios";
import React, { useContext } from "react";
import { BsGooglePlay } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { ImAppleinc } from "react-icons/im";
import { PiSoundcloudLogoThin } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../MyContext";
import { audio } from "../Audios";
import Card from "../Card/Card";
import cutPhone from "../Images/cutPhone.png";
import lady from "../Images/lady.png";
import front from "../Images/sound1.jpg";
import { soundCloudData } from "../SoundCloudSongs";
import "./Sound.css";

export const Footer = () => {
  return (
    <div className="sound_cloud-footer">
      <div className="sound_cloud-footer_a">
        <a href="#">Director</a> <a href="#">About Us</a>
        <a href="#">Artist</a>
        <a href="#">Resources</a>
        <a href="#">Blog</a>
        <a href="#">Jobs</a>
        <a href="#">Developers</a>
        <a href="#">Help </a>
        <a href="#">Legal</a>
        <a href="#">Privacy</a>
        <a href="#">Cookie Policy</a>
        <a href="#">Consent Manager</a>
        <a href="#">Imprint</a>
        <a href="#">Charts</a>
      </div>
      <div>
        <p>Language:English(Us)</p>
      </div>
    </div>
  );
};
const Sound = () => {
  const {
    setLoginPage,
    setSongPlay,
    setIsPlaying,
    setCurrentSongIndex,
    setSearchedItems,
    songId,
    setAllSongs,
    setCreateAccount,
    search,
    setSearch,
  } = useContext(MyContext);
  const navigate = useNavigate();
  const handleClick = async (mood, item) => {
    if (songId === item._id) {
      return;
    }
    try {
      const response = await axios.get(
        "https://academics.newtonschool.co/api/v1/music/song",
        {
          headers: {
            projectId: "yji0muf36wd4",
          },
          params: {
            filter: JSON.stringify({ mood }),
            sort: JSON.stringify({ release: 1 }),
            page: 2,
            limit: 10,
          },
        }
      );

      setSongPlay([item, ...response.data.data] || []);
      setAllSongs([item, ...response.data.data] || []);
      setIsPlaying(true);
      setCurrentSongIndex(0);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleSearch = async () => {
    if (!search) {
      return;
    }

    const filteredItems = soundCloudData.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase())
    );
    setSearchedItems(filteredItems);
    navigate("/search");
  };

  return (
    <div className="sound_cloud-sound">
      <div className="sound_cloud-sound_container">
        <main className="sound_cloud-sound_head">
          <div className="sound_cloud-sound_header_image">
            <img src={front} alt="" />
            <div className="sound_cloud-sound_header_cover">
              <div className="sound_cloud-sound_create_account_cloud">
                <div className="sound_cloud-sound_icon_left">
                  <span className="sound_cloud-sound_icon">
                    <PiSoundcloudLogoThin />
                  </span>
                  <span>
                    <p>sound Cloud</p>
                  </span>
                </div>
                <div className="sound_cloud-sound_create_account">
                  <div className="sound_cloud-sound_create_account_button">
                    <button onClick={() => setLoginPage(true)}>Sign in</button>
                    <button
                      onClick={() => {
                        setCreateAccount(true);
                        setLoginPage(true);
                      }}
                    >
                      Create account
                    </button>
                    <button onClick={() => navigate("/nextPro")}>
                      For Artists
                    </button>
                  </div>
                </div>
              </div>
              <div className="sound_cloud-sound_header_middle">
                <h1>Connect on SoundCloud</h1>
                <p>
                  Discover, stream, and share a constantly expanding mix of
                  music from emerging and major artists around the world.
                </p>
                <button
                  onClick={() => {
                    setCreateAccount(true);
                    setLoginPage(true);
                  }}
                >
                  Sign up for free
                </button>
              </div>
            </div>
          </div>

          <div className="sound_cloud-sound_search">
            <div className="sound_cloud-sound_option">
              <div>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key == "Enter") handleSearch();
                  }}
                  placeholder="Search for artists, bands, tracks, podcasts"
                />
                <button onClick={handleSearch}>
                  <FiSearch />
                </button>
              </div>
              <p>or</p>
              <button onClick={() => navigate("/upload")}>
                Upload your own
              </button>
            </div>
          </div>
          <h2 className="sound_cloud-sound_h2">
            Hear what’s trending for free in the SoundCloud community
          </h2>

          <div className="sound_cloud-sound_grid">
            {audio.slice(80, 92).map((item) => (
              <div key={item._id} onClick={() => handleClick(item.mood, item)}>
                <Card item={item} />
              </div>
            ))}
          </div>

          <div className="sound_cloud-sound_explore">
            <button
              onClick={() => navigate("/song/playlists")}
              style={{ cursor: "pointer" }}
            >
              Explore trending playlists
            </button>
          </div>
        </main>
        <div className="sound_cloud-sound_bottom_section">
          <div className="sound_cloud-sound_bottom_image">
            <div className="sound_cloud-sound_bottom_img">
              <img src={cutPhone} alt="" />
            </div>
            <div className="sound_cloud-sound_never_stop">
              <h2>Never stop listening</h2>
              <div className="sound_cloud-sound_never_stop_line"></div>
              <p>
                SoundCloud is available on Web, iOS, Android, Sonos, Chromecast,
                and Xbox One.
              </p>
              <div className="sound_clone-sound_bottom_button">
                <button
                  onClick={() =>
                    (window.location.href =
                      "https://apps.apple.com/us/app/soundcloud/id336353151")
                  }
                >
                  <span>
                    <ImAppleinc />
                  </span>
                  <span>
                    <p>Download on the </p>
                    <h4>App Store</h4>
                  </span>
                </button>
                <button
                  onClick={() =>
                    (window.location.href =
                      "https://play.google.com/store/apps/details?id=com.soundcloud.android&hl=us&pli=1")
                  }
                >
                  <span>
                    <BsGooglePlay />
                  </span>
                  <span>
                    <p>GET IT ON</p>
                    <h4>Google Play</h4>
                  </span>
                </button>
              </div>
            </div>
          </div>
          <div className="sound_cloud-sound_last_section">
            <img src={lady} alt="" />
            <div className="sound_cloud-sound_last_section_heading">
              <h1>Thanks for listening.Now join in.</h1>
              <p>
                Save tracks, follow artists and build playlists. All for free.
              </p>
              <div className="sound_cloud-sound_last_section_button">
                <button
                  onClick={() => {
                    setCreateAccount(true);
                    setLoginPage(true);
                  }}
                >
                  Create Account
                </button>
              </div>
              <div className="sound_cloud-sound_last_section_already">
                <p>Already have an account?</p>{" "}
                <button onClick={() => setLoginPage(true)}>Sign In</button>
              </div>
            </div>
            <div className="sound_cloud-sound_footer">
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sound;
