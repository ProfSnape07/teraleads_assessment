import LoginForm from "../components/LoginForm";
import PatientList from "../components/PatientList.jsx";
import Chatbot from "../components/Chatbot.jsx";

export default function Dashboard({isAuthenticated, handleLogin}) {


    return (<div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {isAuthenticated ? (<>
            <PatientList handleLogin={handleLogin}/>
            <Chatbot/>
        </>) : (<LoginForm onLoginSuccess={handleLogin}/>)}
    </div>);
}
