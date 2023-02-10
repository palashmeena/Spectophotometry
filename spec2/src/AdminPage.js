import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AdminPage() {
    const [allUsers, setAllUsers] = useState([]);
    const navigate = useNavigate();
    const handleShowUserCaptures = (e) => {
        const id = e.target.id;
        navigate(`/user/${id}`);
    };
    useEffect(() => {
        const getAllUsers = async () => {
            try {
                const response = await fetch("http://localhost:5000/users", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const data = await response.json();
                //console.log(data);
                setAllUsers(data.allUsers);
            } catch (error) {
                console.error(error);
            }
        };
        getAllUsers();
    }, []);
    return (
        <>
            <h1>All Users</h1>
            <ul>
                {allUsers.map((user) => {
                    return (
                        <li
                            key={user._id}
                            id={user._id}
                            onClick={handleShowUserCaptures}
                            style={{ padding: "10px" }}
                        >
                            {user.name}
                        </li>
                    );
                })}
            </ul>
        </>
    );
}

export default AdminPage;
