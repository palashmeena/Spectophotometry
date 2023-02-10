import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Routes,
} from "react-router-dom";
import FormPage from "./FormPage";
import CameraPage from "./CameraPage";

function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<FormPage />} />
                <Route exact path="/camera" element={<CameraPage />} />
            </Routes>
        </Router>
    );
}
export default App;
