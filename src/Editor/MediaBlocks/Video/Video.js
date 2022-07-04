/* eslint-disable no-useless-escape */
import { useState } from "react";
import { RiVideoLine } from "react-icons/ri";
import { Input, Button } from 'antd';
import Styles from "./_.module.css";

const VideoBlock = ({ data, onEmbedLinkSubmit }) => {
  const [embedLink, setEmbedLink] = useState(
    data?.content?.videoEmbedUrl || ""
  );
  const [showPopup, setShowPopup] = useState(true);

  /** Private Method */
  const _checkAndGetYoutubeEmbedUrl = (url) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length) {
      return `https://www.youtube.com/embed/${match[2]}?autoplay=0`;
    }
    return url;
  };
  /** Private Methods end */

  const onSubmitHandler = () => {
    if (embedLink !== "") {
      const url = _checkAndGetYoutubeEmbedUrl(embedLink);
      onEmbedLinkSubmit?.({ key: "videoEmbedUrl", embedLink: url });
    }
  };

  return (
    <div className={Styles.mediaVideoBlockContainer}>
      {data?.content?.videoEmbedUrl ? (
        <iframe
          title="video"
          className={Styles.videoPreview}
          src={data?.content?.videoEmbedUrl}
        ></iframe>
      ) : (
        <div className={Styles.mediaBlockContainer}>
          <div className={Styles.emptyMediaBlockContainer} onClick={() => setShowPopup(!showPopup)}>
            <RiVideoLine size={25} />
            <p>Add a video</p>
          </div>
          {
            showPopup ? (
              <div className={Styles.videoActionSection}>
                <div className={Styles.header}>
                  <ul>
                    <li className={Styles.active}>Embed Link</li>
                    <li className={''}>Upload</li>
                  </ul>
                </div>
                <div className={Styles.body}>
                  <RiVideoLine size={30} />
                  <Input
                    type="text"
                    onChange={(e) => setEmbedLink(e.target?.value?.trim())}
                    value={embedLink}
                    placeholder="Enter any video url from web"
                  />
                  <Button onClick={onSubmitHandler} type="button">
                    Embed Link
                  </Button>

                  <span className={Styles.note}>Works with any video from web</span>
                </div>
              </div>
            ) : null
          }
        </div>
      )}
    </div>
  );
};

export default VideoBlock;
