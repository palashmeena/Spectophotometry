import React from "react";
import Webcam from "react-webcam";
import "./CameraPage.css";
import { useRef, useEffect, useState } from "react";

/* video constraints */
const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
};

function CameraPage() {
    const [imageSrc, setImageSrc] = useState(null);
    const webcamRef = React.useRef(null);
    const capture = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        // console.log(imageSrc);
        setImageSrc(imageSrc);
    };

    useEffect(() => {
        setInterval(() => {
            console.log("Timer");
            capture();
        }, 3000);
    }, []);

    useEffect(() => {
        const handleSubmit = async () => {
            const id = localStorage.getItem("id");
            console.log(imageSrc);
            try {
                const response = await fetch("http://localhost:5000/capture", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id: id,
                        imageSrc: imageSrc,
                        timeStamp: new Date().toISOString(),
                    }),
                });
                const data = await response.json();
                // console.log(data);
            } catch (error) {
                console.error(error);
            }
        };
        handleSubmit();
    }, [imageSrc]);
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
        </>
    );
}
export default CameraPage;
