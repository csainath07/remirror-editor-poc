import { useState } from "react";
import { Upload, Tag } from 'antd';
import { RiAttachmentLine } from "react-icons/ri";
import { fileSize } from '../../../utils/helperFunction';
import Styles from "./_.module.css";

const { Dragger } = Upload;

const FileBlock = ({ data, onFileUpload, editable = false }) => {
	const [showPopup, setShowPopup] = useState(true);

	const onFileChangeHandler = (info) => {
		onFileUpload?.({ key: "uploadedFile", file: info?.file?.originFileObj });
	};
	return (
		<div className={Styles.mediaFileBlockContainer}>
			{data?.content?.uploadedFile ? (
				<div className={Styles.filePreview}>
					<RiAttachmentLine size={20} />
					<span>{data?.content?.uploadedFile?.name || ''}</span>
					<span className={Styles.fileSize}>({fileSize(data?.content?.uploadedFile?.size || 0)})</span>&nbsp;
					<Tag color="red"><strong>Note:</strong> Read file feature is <strong>disabled!!</strong></Tag>
				</div>
			) : (
				<div className={`${!editable ? 'hide' : ''} ${Styles.mediaBlockContainer}`}>
					<div className={Styles.emptyMediaBlockContainer} onClick={() => setShowPopup(!showPopup)}>
						<RiAttachmentLine size={25} />
						<p>Upload a file</p>
					</div>
					{
						showPopup && editable ? (
							<div className={Styles.fileActionSection}>
								<div className={Styles.header}>
									<ul>
										<li className={Styles.active}>Upload</li>
									</ul>
								</div>
								<div className={Styles.body}>
									<Dragger
										multiple={false}
										onChange={onFileChangeHandler}
										showUploadList={false}
									>
										<RiAttachmentLine size={30} />
										<p className={Styles.uploadHelpText}>Click or drag file to this area to upload</p>
									</Dragger>
								</div>
							</div>
						) : null
					}
				</div>
			)}
		</div>
	);
};

export default FileBlock;
