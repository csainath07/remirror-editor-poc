import { useState } from "react";
import { Input, Button, Tag } from 'antd';
import { RiVolumeUpLine } from "react-icons/ri";
import Styles from "./_.module.css";

const AudioBlock = ({ data, onEmbedLinkSubmit, editable = false }) => {
  const [embedLink, setEmbedLink] = useState(
    data?.content?.audioEmbedUrl || ""
  );
  const [showPopup, setShowPopup] = useState(true);

  const onSubmitHandler = () => {
    if (embedLink !== "") {
      onEmbedLinkSubmit?.({ key: "audioEmbedUrl", embedLink });
    }
  };
  return (
    <div className={Styles.mediaAudioBlockContainer}>
      {data?.content?.audioEmbedUrl ? (
        <audio
          src={data?.content?.audioEmbedUrl}
          alt=""
          className={Styles.audioPreview}
          controls
        />
      ) : (
        <div className={`${!editable ? 'hide' : ''} ${Styles.mediaBlockContainer}`}>
          <div className={Styles.emptyMediaBlockContainer} onClick={() => setShowPopup(!showPopup)}>
            <RiVolumeUpLine size={25} />
            <p>Add an audio</p>
          </div>
          {
            showPopup && editable ? (
              <div className={Styles.audioActionSection}>
                <div className={Styles.header}>
                  <ul>
                    <li className={Styles.active}>Embed Link</li>
                    <li className={''}>Upload <Tag color="red" className={Styles.badgeLabel}>Coming Soon!!</Tag></li>
                  </ul>
                </div>
                <div className={Styles.body}>
                  <RiVolumeUpLine size={30} />
                  <Input
                    type="text"
                    onChange={(e) => setEmbedLink(e.target?.value?.trim())}
                    value={embedLink}
                    placeholder="Enter any audio url from web"
                  />
                  <Button onClick={onSubmitHandler} type="button">
                    Embed Link
                  </Button>

                  <span className={Styles.note}>Works with any audio from web</span>
                </div>
              </div>
            ) : null
          }
        </div>
      )}
    </div>
  );
};

export default AudioBlock;
