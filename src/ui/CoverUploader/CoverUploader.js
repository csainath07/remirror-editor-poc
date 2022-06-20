import React, { useState } from 'react';
import { Upload } from 'antd';
import Icon from '../Icon/Icon';
import { getBase64 } from '../../utils/helperFunction';
import Styles from './CoverUploader.module.css';

const CoverUploader = ({ editable = false, preview = '' }) => {
  const [previewUrl, setPreviewUrl] = useState(preview);

  const onChangeHandler = (value) => {
    getBase64(value.file.originFileObj, (imageUrl) => setPreviewUrl(imageUrl));
  };

  return (
    <div
      style={{
        backgroundImage: `url(${previewUrl})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
      className={Styles.coverPhotoUploaderContainer}
      id="coverPhotoUploaderContainer"
    >
      {editable ? (
        <Upload
          className={Styles.updateCoverUploader}
          showUploadList={false}
          accept="image/*"
          onChange={onChangeHandler}
          autoUpload={false}
          disabled={!editable}
        >
          <span className={Styles.uploadText}>
            <Icon icon="cameraFill" />
          </span>
        </Upload>
      ) : (
        ''
      )}
    </div>
  );
};

export default CoverUploader;
