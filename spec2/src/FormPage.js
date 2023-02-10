import { useNavigate } from "react-router-dom";

const React = require("react");
const { useState } = require("react");
import("./index.css");

function FormPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [testValidationCode, setTestValidationCode] = useState("");
    const [adminId, setAdminId] = useState("");
    const [adminPassword, setAdminPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch("http://localhost:5000/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, testValidationCode }),
            });
            const data = await response.json();
            // console.log("id", data.id);

            localStorage.setItem("id", data.id);

            navigate("/camera");
        } catch (error) {
            console.error(error);
        }
    };

    const handleAdminLogin = () => {
        navigate("/admin");
    };

    return (
        <div className="loginPage">
            <h1>User Login</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input
                        type="text"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                </label>
                <br />
                <label>
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </label>
                <br />
                <label>
                    Test Validation Code:
                    <input
                        type="text"
                        value={testValidationCode}
                        onChange={(event) =>
                            setTestValidationCode(event.target.value)
                        }
                    />
                </label>
                <br />
                <button type="submit">Start Test</button>
            </form>
            <hr />
            <form onSubmit={handleAdminLogin}>
                <h1>Admin Login</h1>
                <label>
                    Admin Id:
                    <input
                        type="text"
                        value={adminId}
                        onChange={(event) => setAdminId(event.target.value)}
                    />
                </label>
                <br />
                <label>
                    Admin Password:
                    <input
                        type="text"
                        value={adminPassword}
                        onChange={(event) =>
                            setAdminPassword(event.target.value)
                        }
                    />
                </label>
                <br />
                <button type="submit">Login as Admin</button>
            </form>
        </div>
    );
}

export default FormPage;
