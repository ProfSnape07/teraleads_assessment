import {useState} from "react";
import api from "../api";

export default function Chatbot() {
    const [query, setQuery] = useState("");
    const [messages, setMessages] = useState([]);

    const handleSend = async () => {
        if (!query.trim()) return;

        try {
            const res = await api.post("/chatbot/", {query});
            const {query: userQuery, reply} = res.data;
            setMessages([...messages, {user: userQuery, bot: reply}]);
            setQuery("");
        } catch (err) {
            console.error("Error sending question to chatbot", err);
        }
    };

    return (<div className="bg-white p-4 rounded shadow h-full flex flex-col">
            <h2 className="text-xl font-semibold mb-2">Chatbot</h2>
            <div className="flex-1 overflow-y-auto space-y-2 mb-2">
                {messages.map((m, i) => (<div key={i}>
                        <p><strong>You:</strong> {m.user}</p>
                        <p><strong>Bot:</strong> {m.bot}</p>
                    </div>))}
            </div>
            <div className="flex space-x-2">
                <input
                    className="border p-2 flex-1"
                    name="query"
                    autoComplete="off"
                    placeholder="Ask a question..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                />
                <button onClick={handleSend} className="bg-green-500 text-white px-4 py-2 rounded">
                    Send
                </button>
            </div>
        </div>);
}
