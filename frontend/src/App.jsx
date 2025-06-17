import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import LoginForm from "./components/LoginForm.jsx";
import RegisterForm from "./components/RegisterForm.jsx";
import {useCallback, useEffect, useState} from "react";
import {jwtDecode} from "jwt-decode";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                const currentTime = Date.now() / 1000; // in seconds

                if (decoded.exp > currentTime) {
                    setIsAuthenticated(true);
                } else {
                    console.log("Token expired");
                    localStorage.removeItem("access_token");
                }
            } catch (err) {
                console.error("Invalid token", err);
                localStorage.removeItem("access_token");
            }
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    const handleLogin = useCallback((a) => {
        setIsAuthenticated(a);
    }, []);

    return (<Router>
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="w-full max-w-3xl p-4 bg-white rounded-xl shadow">
                <h1 className="text-3xl font-bold mb-4 text-center">
                    Patient Assistant Dashboard
                </h1>
                <Routes>
                    <Route path="/login"
                           element={<LoginForm isAuthenticated={isAuthenticated} onLoginSuccess={handleLogin}/>}/>
                    <Route path="/register" element={<RegisterForm isAuthenticated={isAuthenticated}/>}/>
                    <Route path="/"
                           element={<Dashboard isAuthenticated={isAuthenticated} handleLogin={handleLogin}/>}/>
                </Routes>
            </div>
        </div>
    </Router>);
}

export default App;
