import React from "react";
import Webcam from "react-webcam";
import "./CameraPage.css";
import { useRef, useEffect, useState } from "react";
function CameraPage() {
    const [imageSrc, setImageSrc] = useState(null);
    const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: "user",
    };
    const webcamRef = React.useRef(null);
    const capture = () => {
        const imageSrc = webcamRef.current.getScreenshot();

        console.log(imageSrc);
        setImageSrc(imageSrc);
    };
    setInterval(function () {
        capture();
    }, 180000);
    return (
        <>
            <div className="webcam">
                <Webcam
                    className="webcam"
                    audio={false}
                    height={720}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    width={1280}
                    videoConstraints={videoConstraints}
                />
            </div>
            {/* <button onClick={capture}>Capture photo</button> */}
            {/* {imageSrc === null ? null : <img src={imageSrc} alt="user-img" />} */}
        </>
    );
    // const [image, setImage] = useState(null);
    // const webRef = useRef(null);

    // useEffect(() => {
    //     const clickImage = () => {
    //         console.log(webRef.current);
    //         let tempImage = webRef.current.getScreenshot();
    //         console.log(tempImage);
    //         // setImage(tempImage);
    //     };
    //     clickImage();
    // });

    // return (
    //     <div>
    //         <h1>Camera</h1>
    //         <Webcam
    //             audio={false}
    //             height={720}
    //             ref={webRef}
    //             screenshotFormat="image/jpeg"
    //             width={1280}
    //         />
    //         {/* <img src={image} alt="palash"></img> */}
    //     </div>
    // );
}
export default CameraPage;
