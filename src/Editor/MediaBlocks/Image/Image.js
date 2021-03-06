import { useState } from "react";
import { Input, Button, Tag } from 'antd';
import { RiImage2Line } from "react-icons/ri";
import Styles from "./_.module.css";

const ImageBlock = ({ data, onEmbedLinkSubmit, editable = false }) => {
  const [embedLink, setEmbedLink] = useState(
    data?.content?.imageEmbedUrl || ""
  );
  const [showPopup, setShowPopup] = useState(true);

  const onSubmitHandler = () => {
    if (embedLink !== "") {
      onEmbedLinkSubmit?.({ key: "imageEmbedUrl", embedLink });
    }
  };
  return (
    <div className={Styles.mediaImageBlockContainer}>
      {data?.content?.imageEmbedUrl ? (
        <img
          src={data?.content?.imageEmbedUrl}
          alt=""
          className={Styles.imagePreview}
        />
      ) : (
        <div className={`${!editable ? 'hide' : ''} ${Styles.mediaBlockContainer}`}>
          <div className={Styles.emptyMediaBlockContainer} onClick={() => setShowPopup(!showPopup)}>
            <RiImage2Line size={25} />
            <p>Add an image</p>
          </div>
          {
            showPopup && editable ? (
              <div className={Styles.imageActionSection}>
                <div className={Styles.header}>
                  <ul>
                    <li className={Styles.active}>Embed Link</li>
                    <li className={''}>Upload <Tag color="red" className={Styles.badgeLabel}>Coming Soon!!</Tag></li>
                  </ul>
                </div>
                <div className={Styles.body}>
                  <RiImage2Line size={30} />
                  <Input
                    type="text"
                    onChange={(e) => setEmbedLink(e.target?.value?.trim())}
                    value={embedLink}
                    placeholder="Enter any image url from web"
                  />
                  <Button onClick={onSubmitHandler} type="button">
                    Embed Link
                  </Button>

                  <span className={Styles.note}>Works with any image from web</span>
                </div>
              </div>
            ) : null
          }
        </div>
      )}
    </div>
  );
};

export default ImageBlock;
