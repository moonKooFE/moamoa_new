import styles from './FileUpload.module.css';
import Camera from '../../Assets/camera.png';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import imageCompression from 'browser-image-compression';
const FileUpload = () => {
    const [imageSrc, setImageSrc] = useState('');
    const [file, setFile] = useState("");
    const encodeFileToBase64 = (fileBlob) => {
        if(fileBlob!=null){
            const reader = new FileReader();
            reader.readAsDataURL(fileBlob);

            if(fileBlob.size >= 1048576){
                // 이미지 압축  
                //console.log("이미지 압축 진행")
                const options = {
                  maxSizeMB: 1, // 최대 파일 크기 (1MB로 설정)
                  maxWidthOrHeight: 1920, // 이미지의 최대 너비 또는 높이
                };
                
                imageCompression(fileBlob, options)
                  .then((compressedImage) => {
                    //console.log("압축완료.")
                    //console.log(compressedImage);
                    compressedImage = new File([compressedImage], fileBlob.name, { type: 'image/png' })
                    //console.log(compressedImage);
                    setFile(compressedImage);
                  })
                  .catch((error) => {
                    console.error('이미지 압축 오류:', error);
                  });
            } else {
            setFile(fileBlob);
            }
            return new Promise((resolve) => {
                reader.onload = () => {
                    setImageSrc(reader.result);
                    resolve();
                };
            });
        }
    };
    return(
        <div className={styles.circle}>
            <label htmlFor="camera1" className={styles.camera}>
                {
                    imageSrc ? imageSrc && <img loading="lazy" src={imageSrc} alt="preview-img" className={styles.imgtag}/> :
                    <img loading="lazy" src={Camera} className={styles.camera2}></img>
                }
            </label>
            <input type="file" id="camera1" accept="image/*" onChange={(e) => {encodeFileToBase64(e.target.files[0]);}}></input>
            </div>
    );
};
export default FileUpload;