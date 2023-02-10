import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Routes,
} from "react-router-dom";
import FormPage from "./FormPage";
import CameraPage from "./CameraPage";
import AdminPage from "./AdminPage";
import UserPage from "./UserPage";

function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<FormPage />} />
                <Route exact path="/camera" element={<CameraPage />} />
                <Route exact path="/admin" element={<AdminPage />} />
                <Route exact path="/user/:id" element={<UserPage />} />
            </Routes>
        </Router>
    );
}
export default App;
