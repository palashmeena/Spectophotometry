import { useNavigate } from "react-router-dom";

const React = require("react");
const { useState } = require("react");
import("./index.css");

function FormPage() {
    const [name, setName] = useState("aidwj");
    const [email, setEmail] = useState("aowdin@gmail.com");
    const [testValidationCode, setTestValidationCode] = useState("laudalehsun");
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
            console.log(data);

            navigate("/camera");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
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
        </div>
    );
}

export default FormPage;
