import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function UserPage() {
    const [allCaptures, setAllCaptures] = useState([]);
    const params = useParams();
    const id = params.id;
    console.log(params);
    useEffect(() => {
        const getAllCaptures = async () => {
            try {
                const response = await fetch(
                    `http://localhost:5000/user/${id}/captures`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                const data = await response.json();
                console.log(data);
                setAllCaptures(data.allCaptures);
            } catch (error) {
                console.error(error);
            }
        };
        getAllCaptures();
    }, []);
    return (
        <ul style={{ color: "white" }}>
            {allCaptures.map((capture, index) => {
                return (
                    <li key={index} id={index} style={{ padding: "10px" }}>
                        <img src={capture.imageSrc} alt={index} />
                        <p>{capture.timeStamp}</p>
                    </li>
                );
            })}
        </ul>
    );
}

export default UserPage;
