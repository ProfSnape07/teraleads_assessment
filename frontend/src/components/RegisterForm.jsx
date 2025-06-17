import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function RegisterForm({isAuthenticated}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Clear previous errors

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8000/register", {username, password});
            console.log("Registration successful:", response.data);
            navigate("/login");
        } catch (err) {
            console.error("Registration error:", err);
            setError("Registration failed. Please try again.");
        }
    };

    const handleLoginRedirect = () => {
        navigate("/login");
    };

    return (<form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto">
            <div className="text-center">
                <p>Please create an account</p>
            </div>
            {error && (<div className="text-red-500 text-sm text-center">{error}</div>)}
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
                                autoComplete="new-password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Retype Password
                        </td>
                        <td>
                            <input
                                className="w-full border p-2 rounded"
                                name="ConfirmPassword"
                                placeholder="Retype Password"
                                autoComplete="new-password"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div>
                <button
                    className="w-full bg-blue-600 text-white p-2 rounded"
                    type="submit"
                >
                    Register
                </button>
                <button
                    className="w-full bg-gray-500 text-white p-2 rounded mt-2"
                    type="button"
                    onClick={handleLoginRedirect}
                >
                    Login
                </button>
            </div>
        </form>);
}
