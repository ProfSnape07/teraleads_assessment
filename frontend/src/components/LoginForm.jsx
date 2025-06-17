import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom"; // Import useNavigate

export default function LoginForm({isAuthenticated, onLoginSuccess}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:8000/login",
                new URLSearchParams({username, password}),
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                }
            );

            const {access_token} = response.data;
            localStorage.setItem("access_token", access_token);
            onLoginSuccess(true);
            console.log("Login successful");

        } catch (err) {
            console.error("Login error:", err);
        }
    };

    const handleRegisterRedirect = () => {
        navigate("/register"); // Redirect to the register page
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto">
            <div className="text-center">
                <p>Please login to continue</p>
            </div>
            <div>
                <table className="w-full">
                    <tbody>
                    <tr>
                        <td>
                            Username
                        </td>
                        <td>
                            <input
                                className="w-full border p-2 rounded"
                                name="Username"
                                placeholder="Username"
                                autoComplete="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Password
                        </td>
                        <td>
                            <input
                                className="w-full border p-2 rounded"
                                name="Password"
                                placeholder="Password"
                                autoComplete="current-password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div>
                <button
                    className="w-full bg-gray-500 text-white p-2 rounded"
                    type="button"
                    onClick={handleRegisterRedirect} // Handle button click
                >
                    Register
                </button>
                <button
                    className="w-full bg-blue-600 text-white p-2 rounded"
                    type="submit"
                >
                    Login
                </button>
            </div>
        </form>
    );
}
