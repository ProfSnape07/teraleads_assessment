import {useEffect, useState} from "react";
import api from "../api";
import PatientForm from "./PatientForm.jsx";

export default function PatientList({handleLogin}) {
    const [patients, setPatients] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [refreshFlag, setRefreshFlag] = useState(false);

    useEffect(() => {
        api.get("/patients")
            .then((res) => setPatients(res.data))
            .catch((err) => {
                console.error("Error fetching patients", err);
                alert("Failed to load patients. Please login.");
            });
    }, [refreshFlag]);

    const refreshList = () => setRefreshFlag(!refreshFlag);

    const handleCancel = () => setShowForm(false);

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        handleLogin(false);
    };

    return (<div className="p-4">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Patient List</h2>
            <button
                onClick={handleLogout}
                className="bg-red-500 text-white p-2 rounded"
            >
                Logout
            </button>
        </div>

        <button
            onClick={() => setShowForm((prev) => !prev)}
            className="bg-green-500 text-white p-2 rounded mb-4"
        >
            Create Patient
        </button>

        {showForm && (<PatientForm onPatientAdded={refreshList} onCancel={handleCancel}/>)}

        {patients.length === 0 ? (<p>No patients yet.</p>) : (<ul className="space-y-2">
            {patients.map((p) => (<li key={p.email} className="border p-3 rounded shadow-sm">
                <strong>{p.name}</strong> ({p.gender ? "Male" : "Female"})<br/>
                Email: {p.email} | Phone: {p.phone} | DOB: {p.dob}
                {p.notes && (<div className="mt-1 text-sm text-gray-600">
                    Notes: {p.notes}
                </div>)}
            </li>))}
        </ul>)}
    </div>);
}
